// tslint:disable-next-line:eofline
import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class ExceptionHandling {
    constructor(private _http: HttpClient) {

    }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error); // log to console instead
          return of(result as T);
        };
      }
}
