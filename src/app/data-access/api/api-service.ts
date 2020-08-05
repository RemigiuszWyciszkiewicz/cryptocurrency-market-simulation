import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injector } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { EndpointUrlBuilder } from './api-url-builder';

export interface RequestParams {
  [key: string]: any;
}

export interface RestService {
  post<T>(item: Partial<T> | FormData, contentType: string, endpoint: string): Observable<T>;
  get<T>(id: ID, endpoint: string, params: HttpParams): Observable<T>;
  put<T>(id: ID, item: T, endpoint: string): Observable<T>;
  delete<T>(id: ID, endpoint: string): Observable<T>;
  getAll<T>(endpoint: string): Observable<T[]>;
}

export abstract class ApiService implements RestService {
  protected _apiServiceUrl = environment.production
    ? 'https://cryptocurrencymarketsimulation.herokuapp.com/api'
    : 'http://localhost:4100/api';
  protected _httpClient: HttpClient;
  protected _route: string;

  constructor(protected _injector: Injector, route: string) {
    this._httpClient = _injector.get(HttpClient);
    this._route = route;
  }

  post<T>(item: Partial<T> | FormData, endpoint: string, contentType = 'application/json'): Observable<T> {
    if (item instanceof FormData) {
      return this._httpClient.post<T>(`${this.generateEndpointUrl(endpoint)}`, item);
    }

    return this._httpClient.post<T>(`${this.generateEndpointUrl(endpoint)}`, item, {
      headers: new HttpHeaders().set('Content-Type', contentType),
    });
  }

  get<T>(id: ID, endpoint: string = '', params?: HttpParams): Observable<T> {
    return this._httpClient.get<T>(`${this.generateEndpointUrl(endpoint, params)}/${id}`, { params });
  }

  put<T>(id: ID, item: Partial<T>, endpoint: string): Observable<T> {
    return this._httpClient.put<T>(`${this.generateEndpointUrl(endpoint)}/${id}`, item);
  }

  delete<T>(id: ID, endpoint: string): Observable<T> {
    return this._httpClient.delete<T>(`${this.generateEndpointUrl(endpoint)}/${id}`);
  }

  getAll<T>(endpoint: string = '', params?: HttpParams): Observable<T[]> {
    return this._httpClient.get<T[]>(`${this.generateEndpointUrl(endpoint)}`, { params });
  }

  protected generateEndpointUrl(endpoint?: string, params?: HttpParams): string {
    return new EndpointUrlBuilder().addApiUrl(this._apiServiceUrl).addRoute(this._route).addEndpoint(endpoint).getUrl();
  }
}
