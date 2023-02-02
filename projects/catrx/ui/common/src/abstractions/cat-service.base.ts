import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { debounceTime, first } from 'rxjs/operators';
import { CatDatatableDataHttpResponse } from '@catrx/ui/datatable';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { CatEnvironment } from '../environments/cat-environment';
import { klArray } from '@koalarx/utils/operators/array';

class CatDatabaseMockup {
  static database: { [key: string]: any[] } = {};
}

class CatServiceMockup {
  constructor(private resourceName: string) {
    if (!CatDatabaseMockup.database[resourceName])
      CatDatabaseMockup.database[resourceName] = [];
  }

  getById<EntityType = any>(id: number) {
    return new Observable<EntityType>((observe) => {
      setTimeout(() => {
        const index = klArray(this.getDatabase()).getIndex('id', id);
        if (index >= 0) {
          observe.next(this.getDatabase()[index]);
        } else {
          observe.error(
            new HttpErrorResponse({
              status: 404,
              statusText: 'Not Found',
            })
          );
        }
        observe.complete();
      }, 1000);
    }).pipe(first());
  }

  getAll<ListType = any>() {
    return new Observable<ListType>((observe) => {
      setTimeout(() => observe.next(this.getDatabase() as ListType), 1000);
    }).pipe(first());
  }

  save<ListType = any>(item: ListType, id?: number) {
    return new Observable((observe) => {
      setTimeout(() => {
        if (id) {
          const index = klArray(this.getDatabase()).getIndex('id', id);
          item['id'] = id;
          if (index >= 0) this.getDatabase()[index] = item;
        } else {
          item['id'] = this.getNextId();
          this.getDatabase().push(item);
        }
        observe.next();
        observe.complete();
      }, 1000);
    }).pipe(first());
  }

  delete(id: number) {
    return new Observable((observe) => {
      setTimeout(() => {
        const index = klArray(this.getDatabase()).getIndex('id', id);
        if (index >= 0) this.getDatabase().splice(index, 1);
        observe.next();
        observe.complete();
      }, 1000);
    }).pipe(first());
  }

  private getDatabase() {
    return CatDatabaseMockup.database[this.resourceName];
  }

  private getNextId() {
    const lastId = this.getDatabase()
      .map((item) => item.id)
      .reduce((a, b) => Math.max(a, b), 0);
    return lastId + 1;
  }
}

export interface CatServiceOptions<EntityType = any> {
  customHost?: string;
  useMockup?: boolean;
  mockupStartBase?: EntityType[];
}

@Injectable()
export abstract class CatServiceBase<
  FilterType = any,
  GetAllResponseType = any,
  EntityType = any
> {
  protected host = CatEnvironment.environment.hostApi;

  constructor(
    protected readonly httpClient: HttpClient,
    protected readonly mainResource: string,
    protected readonly options?: CatServiceOptions<EntityType>
  ) {
    if (options?.customHost) {
      this.host = options.customHost;
    }
    if (options?.useMockup && options?.mockupStartBase) {
      CatDatabaseMockup.database[mainResource] = options.mockupStartBase;
    }
  }

  public deleteMany(ids: number[]) {
    return forkJoin(ids.map((id) => this.delete(id))).pipe(first());
  }

  public delete(id: number) {
    if (this.options?.useMockup) {
      return new CatServiceMockup(this.mainResource).delete(id);
    } else {
      return this.httpClient
        .delete(`${this.host}/${this.mainResource}/${id}`)
        .pipe(first());
    }
  }

  public save(data: EntityType, id?: number) {
    if (this.options?.useMockup) {
      return new CatServiceMockup(this.mainResource).save(data, id);
    } else {
      return (id ? this.httpClient.put : this.httpClient.post)(
        `${this.host}/${this.mainResource}${id ? '/' + id : ''}`,
        data
      ).pipe(first());
    }
  }

  public getAll(filter?: FilterType) {
    if (this.options?.useMockup) {
      return new CatServiceMockup(this.mainResource)
        .getAll<GetAllResponseType>()
        .pipe(debounceTime(1000), first());
    } else {
      return this.httpClient
        .get<GetAllResponseType>(`${this.host}/${this.mainResource}`, {
          params: filter ?? {},
        })
        .pipe(first());
    }
  }

  public getById(id: number) {
    if (this.options?.useMockup) {
      return new CatServiceMockup(this.mainResource)
        .getById<EntityType>(id)
        .pipe(debounceTime(1000), first());
    } else {
      return this.httpClient
        .get<EntityType>(`${this.host}/${this.mainResource}/${id}`)
        .pipe(first());
    }
  }

  public exportByService<ItemType = any>(
    service: (
      page: number
    ) => Observable<CatDatatableDataHttpResponse<ItemType>>
  ) {
    return new Observable<number | ItemType[]>((observe) => {
      (async () => {
        let items: ItemType[] = [];
        let totalItems: number;
        let page = 0;
        let error: HttpErrorResponse;

        do {
          const response = (await lastValueFrom(service(page)).catch((err) => {
            error = err;
            return null;
          })) as CatDatatableDataHttpResponse<ItemType>;

          if (response) {
            if (!totalItems) totalItems = response.count;
            items = klArray(items).merge(response.items).getValue();
            observe.next(Math.ceil((items.length * 100) / totalItems));
            page++;
          }
        } while (items.length < totalItems && !error);

        if (!error) {
          return items;
        } else {
          throw error;
        }
      })()
        .then((items) => {
          observe.next(items);
          observe.complete();
        })
        .catch((err) => {
          observe.error(err);
          observe.complete();
        });
    });
  }

  public abstract getDatatable(
    filter: FilterType
  ): Observable<CatDatatableDataHttpResponse<EntityType>>;
}
