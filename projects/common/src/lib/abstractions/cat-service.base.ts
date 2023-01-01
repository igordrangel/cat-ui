import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CatEnvironment } from '../../../../core/src/lib/environments/cat-environment';
import { debounceTime, first } from 'rxjs/operators';
import { CatDatatableDataHttpResponse } from "@catrx/ui/datatable";
import { Observable } from "rxjs/internal/Observable";
import { koala } from "@koalarx/utils";

class CatDatabaseMockup {
  static database: { [key: string]: any[] } = {};
}

class CatServiceMockup {
  constructor(private resourceName: string) {
    if (!CatDatabaseMockup.database[resourceName])
      CatDatabaseMockup.database[resourceName] = [];
  }

  getAll<ListType = any>() {
    return new Observable<ListType>((observe) =>
      observe.next(this.getDatabase() as ListType)
    ).pipe(debounceTime(1000), first());
  }

  save<ListType = any>(item: ListType, id?: number) {
    if (id) {
      const index = koala(this.getDatabase()).array().getIndex('id', id);
      if (index >= 0) this.getDatabase()[index] = item;
    } else {
      this.getDatabase().push(item);
    }
  }

  private getDatabase() {
    return CatDatabaseMockup.database[this.resourceName];
  }
}

export interface CatServiceOptions {
  customHost?: string;
  useMockup?: boolean;
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
    protected readonly options?: CatServiceOptions
  ) {
    if (options?.customHost) {
      this.host = options.customHost;
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

  public abstract getDatatable(
    filter: FilterType
  ): Observable<CatDatatableDataHttpResponse<EntityType>>;
}

