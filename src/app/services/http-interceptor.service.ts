// https://pub.scotch.io/@kashyapmukkamala/using-http-interceptor-with-angular2

import {Injectable} from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { select } from '@angular-redux/store';

@Injectable()
export class HttpInterceptor extends Http {

  // watch token
  @select(['user', 'token']) $token;

  token: string;

  constructor(
    private backend: ConnectionBackend,
    private defaultOptions: RequestOptions) {
    super(backend, defaultOptions);

    this.$token.subscribe(t => this.token = t);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.getRequestOptionArgs(options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, this.getRequestOptionArgs(options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(url, body, this.getRequestOptionArgs(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(url, this.getRequestOptionArgs(options));
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }

    if (this.token) {
      options.headers.append('Authorization', 'token ' + this.token);
    }

    options.headers.append('Content-Type', 'application/json');

    return options;
  }
}