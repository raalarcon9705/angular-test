import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { JwtService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _jwtService: JwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this._jwtService.jwt$.pipe(
      take(1),
      switchMap(jwt => {
        if (jwt) {
          request = request.clone({ setHeaders: {'Auhthorization': `Bearer ${jwt} `}});
        }
        return next.handle(request);
      })
    )
  }
}
