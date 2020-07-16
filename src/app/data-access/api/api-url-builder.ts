export class EndpointUrlBuilder {
  private _endpointArray: Array<string> = [];

  addApiUrl(value?: string): this {
    if (value) {
      this._endpointArray.push(this.stripTrailingSlash(value));
    }
    return this;
  }

  addRoute(apiUrl?: string): this {
    if (apiUrl) {
      this._endpointArray.push('/', this.stripTrailingSlash(apiUrl));
    }
    return this;
  }

  addEndpoint(value?: string): this {
    if (value) {
      this._endpointArray.push('/', this.stripTrailingSlash(value));
    }
    return this;
  }

  getUrl(): string {
    return this._endpointArray.join('');
  }

  stripTrailingSlash(value: string): string {
    if (value.substr(-1) === '/') {
      return value.substr(0, value.length - 1);
    }
    return value;
  }
}
