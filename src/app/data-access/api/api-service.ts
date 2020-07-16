import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EndpointUrlBuilder } from './api-url-builder';

export interface RestService<T, ID> {
  post(item: T): Observable<T>;
  get(id: ID): Observable<T>;
  put(id: ID, item: T): Observable<T>;
  delete(id: ID): Observable<T>;
  getAll(): Observable<T[]>;
}

export interface ApiUrlConfiguration {
  route: string;
  endpoint: string;
}

export abstract class ApiService<T, ID> implements RestService<T, ID> {
  protected _apiServiceUrl = '/api';
  protected _httpClient: HttpClient;

  constructor(protected httpClient: HttpClient) {}

  post(item: Partial<T> | FormData, contentType = 'application/json'): Observable<T> {
    if (item instanceof FormData) {
      return this._httpClient.post<T>(`${this.generateEndpointUrl()}`, item);
    }

    return this._httpClient.post<T>(`${this.generateEndpointUrl()}`, item, {
      headers: new HttpHeaders().set('Content-Type', contentType),
    });
  }

  get(id: ID): Observable<T> {
    return this._httpClient.get<T>(`${this.generateEndpointUrl()}/${id}`);
  }

  put(id: ID, item: Partial<T>): Observable<T> {
    return this._httpClient.put<T>(`${this.generateEndpointUrl()}/${id}`, item);
  }

  delete(id: ID): Observable<T> {
    return this._httpClient.delete<T>(`${this.generateEndpointUrl()}/${id}`);
  }

  getAll(): Observable<T[]> {
    return this._httpClient.get<T[]>(`${this.generateEndpointUrl()}`);
  }

  protected generateEndpointUrl(): string {
    return new EndpointUrlBuilder()
      .addApiUrl(this._apiServiceUrl)
      .addRoute(this.getApiUrlConfiguration().route)
      .addEndpoint(this.getApiUrlConfiguration().endpoint)
      .getUrl();
  }

  protected abstract getApiUrlConfiguration(): ApiUrlConfiguration;
}
