import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = JSON.parse(localStorage.getItem('currentUser'));
    // if (token) {
    //   console.log(request.headers.get('Authorization'));
    //   request = request.clone({
    //     setHeaders: {
    //       Accept: `application/json`,
    //       'Content-Type': `application/json`,
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    // } else {
    //   request = request.clone({
    //     setHeaders: {
    //       Accept: `application/json`,
    //       'Content-Type': `application/json`
    //     }
    //   });
    // }
    return next.handle(request)
       .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              console.log('event--->>>', event.statusText);
          }
          return event;
      }),
         catchError( (error: HttpErrorResponse) => {
            let errMsg = '';
            // Client Side Error
            if (error.error instanceof ErrorEvent) {
              errMsg = `Error: ${error.error.message}`;
            } else {  // Server Side Error
              errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            }
            return throwError(errMsg);
          })
       );
}

}
