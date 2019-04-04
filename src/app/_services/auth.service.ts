import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../_models/users/User';

const apiUrl = '/api';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  login(loginData) {
    return this.http.post<any>(apiUrl + '/users/authenticate', loginData).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  signup(signupData) {
    let url = apiUrl + '/students/';
    return this.http.post(url, signupData).pipe(catchError(this.handleError));
  }

  public get isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') === null ? false : true;
  }

  public get currentUser(): User {
    const decodedToken = helper.decodeToken(
      localStorage.getItem('currentUser')
    );

    return decodedToken;
  }

  public get currentUserId(): string {
    const decodedToken = helper.decodeToken(
      localStorage.getItem('currentUser')
    );

    return decodedToken._id;
  }

  // Test if ID belongs to currently signed in user
  isSelf(id: string): boolean {
    return this.currentUserId === id ? true : false;
  }
}
