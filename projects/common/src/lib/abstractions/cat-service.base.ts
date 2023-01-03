import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CatEnvironment } from '../../../../core/src/lib/environments/cat-environment';
import { debounceTime, first } from 'rxjs/operators';
import { CatDatatableDataHttpResponse } from "@catrx/ui/datatable";
import { Observable } from "rxjs/internal/Observable";
import { koala } from "@koalarx/utils";
import { forkJoin } from "rxjs";

class CatDatabaseMockup {
  static database: { [key: string]: any[] } = {};
}

class CatServiceMockup {
  constructor(private resourceName: string) {
    if (!CatDatabaseMockup.database[resourceName])
      CatDatabaseMockup.database[resourceName] = [];
  }

  getAll<ListType = any>() {
    return new Observable<ListType>((observe) => {
      setTimeout(() => observe.next(this.getDatabase() as ListType), 1000);
    }).pipe(first());
  }

  save<ListType = any>(item: ListType, id?: number) {
    return new Observable(observe => {
      setTimeout(() => {
        if (id) {
          const index = koala(this.getDatabase()).array().getIndex('id', id);
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
        const index = koala(this.getDatabase()).array().getIndex('id', id);
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
      .reduce(
        (a, b) => Math.max(a, b),
        0
    );
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
    if (options.useMockup && options.mockupStartBase) {
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

  public exportCsv() {
    throw new Error('Método não implementando.');
  }

  public exportXlsx() {
    throw new Error('Método não implementando.');
  }

  public abstract getDatatable(
    filter: FilterType
  ): Observable<CatDatatableDataHttpResponse<EntityType>>;
}

