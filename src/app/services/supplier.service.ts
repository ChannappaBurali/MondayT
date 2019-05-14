import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment   } from '../../environments/environment';

@Injectable()
export class SupplierService  {
    /**
     *
     */
    constructor(private _http: HttpClient, router: Router) {
        // super(_http, router);
    }
    public getSuppliers(): Observable<any> {
        return this._http.get(environment.api_path + 'supplier/getsuppliers')
        .pipe(map((response) => {
              return response;
        }));
    }
}
