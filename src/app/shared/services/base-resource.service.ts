import { Plants } from './../../pages/plantCare/shared/plants.model';

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subscriber } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export abstract class BaseResourceService<T extends Plants> {
  protected http: HttpClient;
  protected headers: any;
  subscribeGeneral: Subscriber<T> = new Subscriber();

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getAll(): Observable<T[]> {
    return this.http
      .get<any>(`${this.apiPath}`)
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
      );
  }

  getAllPage(page: number, size: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());
    const url = `${this.apiPath}`;

    return this.http.get<any>(url, {
      params: params,
      headers: this.headers,
    });
  }

  getById(id: number): Observable<T> {
    return this.http
      .get<any>(`${this.apiPath}/${id}`, { headers: this.headers })
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  create(resource: T): Observable<T> {
    resource.lastWateredDate = `${resource.lastWateredDate} 12:00:00`;
    return this.http
      .post(this.apiPath, resource)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;
    resource.lastWateredDate = `${resource.lastWateredDate} 12:00:00`;

    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url, { headers: this.headers }).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  // PROTECTED METHODS

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach((element) =>
      resources.push(this.jsonDataToResourceFn(element))
    );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log('error', error);
    return throwError(error);
  }
}
