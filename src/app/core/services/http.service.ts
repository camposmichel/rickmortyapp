import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INTERCEPT_PREFIX } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class HttpService extends HttpClient {
  constructor(private httpHandler: HttpHandler) {
    super(httpHandler);
  }

  override request(method?: any, url?: any, options?: any): any {
    return super.request(method, url, {
      ...options,
      headers: new HttpHeaders({
        [INTERCEPT_PREFIX]: 'true',
      })
    });
  }

  disableApiPrefix(): HttpClient {
    return new HttpClient(this.httpHandler);
  }
}
