import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (environment.apiKey) {
      const clonedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${environment.apiKey}`
        ),
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}
