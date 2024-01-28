import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { BadInputError } from '../common/bad-input-error';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { ToastrService } from 'ngx-toastr';
import { ConflictError } from '../common/conflict-error';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  toastr: any;

  constructor(
    @Inject(String) private baseUrl: string,
    private http: HttpClient,
    private Injector: Injector
  ) {
    this.toastr = this.Injector.get(ToastrService);
  }

  create(resource: any, url: string) {
    return this.http
      .post(`${environment.baseUrl}/${url}`, resource, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError()));
  }

  get_data(url: string) {
    return this.http
      .get(`${environment.baseUrl}/${url}`, { withCredentials: true })
      .pipe(catchError(this.handleError()));
  }

  logout() {
    alert("logout!!!")
    // localStorage.clear();
    return this.http.get(`${environment.baseUrl}/logout`, {
      withCredentials: true,
    });
  }

  private handleError<T>() {
    return (error: HttpErrorResponse | any): Observable<T> => {
      // return (errorResponse: Response | any): Observable<T> => {
      // console.log('errorResponse: ', errorResponse);
      console.log('error: ', error);
      // console.log('errorResponse.originalError: ', errorResponse.originalError);
      // console.log('errorResponse: ', errorResponse.status);

      // let error = errorResponse.originalError;

      if (error && (error.status || (error?.originalError.status)) === 400) {
        console.log('error.error: ', error.error);
        this.toastr.error(
          'The server cannot process the request at the moment!'
        );
        return throwError(() => new BadInputError(error));
      }

      if (error && (error.status || (error?.originalError.status)) === 404) {
        this.toastr.error('Not found!');
        return throwError(() => new NotFoundError());
      }
      if (error && (error.status || (error?.originalError.status)) === 409) {
        this.toastr.error('Data already exist!');
        return throwError(() => new ConflictError(error));
      }

      this.toastr.error('An unexpected error occurred!');
      return throwError(() => new AppError(error));
    };
  }
}
