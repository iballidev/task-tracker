import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AppError } from '../common/app-error';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private IsRefreshing = false;
  private RefreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(private _authSvc: AuthService, private _router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this._authSvc.accessToken;

    if (this._authSvc.isAuthenticated()) {
      // Clone the request and add the token to the headers if it exists
      if (token) {
        const cloned = this.AddToken(request, token);
        return next.handle(cloned);
      }
    }

    return next.handle(request).pipe(
      tap((event: any) => {
        console.warn('event: ', event);
        if (event?.type === HttpEventType.Response) {
          console.warn('EventBody: ', event.body);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.warn('error: ', error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // auto logout if 401 response returned from api
          // localStorage.clear();
          // this._authSvc.logout();
          this.Handle401Error(request, next);
        }

        //  const error = err.error.message || err.statusText;
        const errormgs = {
          ErrorCode: error.status,
          Message: error.message,
          Response: error.error,
        };
        console.warn('errormgs: ', errormgs);
        if (errormgs?.Response?.error == 'Expired token') {
          this._router.navigate(['/auth']);
        }

        return throwError(() => new AppError(error));
      })
    );
  }

  AddToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  private Handle401Error<T>(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.IsRefreshing) {
      this.IsRefreshing = true;
      this.RefreshTokenSubject.next(null);

      return this._authSvc.refresh_token().pipe(
        switchMap((token: any) => {
          console.log('token: ', token);
          this.IsRefreshing = false;
          // this.RefreshTokenSubject.next(token.jwt);
          // return next.handle(this.AddToken(request, token.jwt));
          this.RefreshTokenSubject.next(token);
          return next.handle(this.AddToken(request, token));
        })
      );
    } else {
      return this.RefreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt: any) => {
          return next.handle(this.AddToken(request, jwt));
        })
      );
    }

    // return (error: HttpErrorResponse): Observable<T> => {
    //   return throwError(() => new AppError(error));
    // };
  }
}
