import { Inject, Injectable, Injector } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { ToastrService } from 'ngx-toastr';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { BadInputError } from '../common/bad-input-error';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // toastr: any;

  constructor(
    @Inject(String) private baseUrl: string,
    private http: HttpClient,
    private Injector: Injector
  ) {
    // this.toastr = this.Injector.get(ToastrService);
  }

  create(resource: any, url: string) {
    return this.http
      .post(`${environment.baseUrl}/${url}`, resource, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError()));
  }

  private handleError<T>() {
    // return (error: HttpErrorResponse): Observable<T> => {
    return (errorResponse: Response | any): Observable<T> => {
      console.log('errorResponse: ', errorResponse);
      // console.log('errorResponse.originalError: ', errorResponse.originalError);
      // console.log('errorResponse: ', errorResponse.status);

      let error = errorResponse.originalError;

      if (error && error.status === 400) {
        // this.toastr.error(
        //   'The server cannot process the request at the moment!'
        // );
        return throwError(() => new BadInputError(error));
      }

      if (error && error.status === 404) {
        // this.toastr.error('Not found!');
        return throwError(() => new NotFoundError());
      }

      // this.toastr.error('An unexpected error occurred!');
      return throwError(() => new AppError(error));
    };
  }
}
