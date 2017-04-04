import { XHRBackend, Http, RequestOptions } from '@angular/http';
import { HttpInterceptor } from './http-interceptor.service';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new HttpInterceptor(xhrBackend, requestOptions);
}
