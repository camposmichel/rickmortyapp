import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { INTERCEPT_PREFIX } from '../consts';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.headers.get(INTERCEPT_PREFIX) &&
      !request.url.startsWith('./')
    ) {
      request = request.clone({
        url: environment.api + request.url,
        headers: this.removeHeaderTag(request),
      });
    }

    return next.handle(request);
  }

  private removeHeaderTag(request: HttpRequest<any>): HttpHeaders {
    return request.headers.delete(INTERCEPT_PREFIX);
  }
}
