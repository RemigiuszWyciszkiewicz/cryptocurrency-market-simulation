import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { EndpointUrlBuilder } from './api-url-builder';

export interface RestService {
  post<T>(item: Partial<T> | FormData, contentType: string, endpoint: string): Observable<T>;
  get<T>(id: string, endpoint: string): Observable<T>;
  put<T>(id: string, item: T, endpoint: string): Observable<T>;
  delete<T>(id: string, endpoint: string): Observable<T>;
  getAll<T>(endpoint: string): Observable<T[]>;
}

export abstract class ApiService implements RestService {
  protected _apiServiceUrl = 'https://coin-market-symulation.herokuapp.com/api';
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

  get<T>(id: string, endpoint: string): Observable<T> {
    return this._httpClient.get<T>(`${this.generateEndpointUrl(endpoint)}/${id}`);
  }

  put<T>(id: string, item: Partial<T>, endpoint: string): Observable<T> {
    return this._httpClient.put<T>(`${this.generateEndpointUrl(endpoint)}/${id}`, item);
  }

  delete<T>(id: string, endpoint: string): Observable<T> {
    return this._httpClient.delete<T>(`${this.generateEndpointUrl(endpoint)}/${id}`);
  }

  getAll<T>(endpoint: string): Observable<T[]> {
    return this._httpClient.get<T[]>(`${this.generateEndpointUrl(endpoint)}`);
  }

  protected generateEndpointUrl(endpoint?: string): string {
    return new EndpointUrlBuilder().addApiUrl(this._apiServiceUrl).addRoute(this._route).addEndpoint(endpoint).getUrl();
  }
}
