import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Product } from '../model/productModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment   } from '../../environments/environment';


@Injectable()
export class ProductService  {
    /**
     *
     */
    constructor(private _http: HttpClient, router: Router) {
        // super(_http, router);
    }
    public getProducts(): Observable<any> {
        const token = JSON.parse(localStorage.getItem('currentUser'));
        if (token) {
            // tslint:disable-next-line:max-line-length
           const headers =  new HttpHeaders({ 'Content-Type': 'application/json', Accept: `application/json`, Authorization: `Bearer ${token}`});
           return this._http.get(environment.api_path + 'product/getproducts', { headers })
        .pipe(map((response) => {
              return response;
        })
        );
    }
}


    public saveProduct(product: Product): Observable<any> {
        return this._http.post(environment.api_path + 'product/saveproduct', product)
        .pipe(map((response) => {
            return response;
        }));
    }

    public updateProduct(product: Product): Observable<any> {
        return this._http.put(environment.api_path + 'product/updateproduct', product)
        .pipe(map((response) => {
            return response;
        }));
    }

    public deleteProduct(productID: number): Observable<any> {
        return this._http.delete(environment.api_path + 'product/deleteproduct/' + productID)
        .pipe(map((response) => {
            return response;
        }));
    }

    public getProductDetailsById(productId: number): Observable<any> {
        return this._http.get(environment.api_path + 'product/productbyid/' + productId)
        .pipe(map((response) => {
            return response;
        }));
    }


    public isProductExists(productName: string): Promise<any> {
        return this._http.get(environment.base_path + 'assets/data/inventory.json').toPromise();
    }


    public CheckProductName(productName: string, productID: number): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this._http.get(environment.api_path + '/product/checkproductname/' + productName + '/' + productID) .pipe(map((response) => {
            return response;
        }));
    }

    public GetTotalCost(): Observable<any> {
        return this._http.get(environment.api_path + '/products/totalcost') .pipe(map((response) => {
            return response;
        }));
    }



}
