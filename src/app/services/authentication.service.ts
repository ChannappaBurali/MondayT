import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        const headers = { headers: new HttpHeaders({ 'Content-Type': 'text/json' }) };
        return this.http.post<any>(environment.api_path + `user/ValidateUser/` + username + '/' + password, headers)
            .pipe(map((token) => {
                // login successful if there's a jwt token in the response
                console.log(token);
                if (token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(token));
                }

                return token;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
