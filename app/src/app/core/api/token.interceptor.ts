import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = localStorage.getItem('token');
    // Clone the request and set the new header in one step.
    if (accessToken) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        }),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }

  }
}
