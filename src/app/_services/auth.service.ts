import { Injectable, Output } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../_models/users/User';
import { NgForm } from '@angular/forms';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthService {
  public getCurrentUser = new Subject();

  apiUrl = '/api';
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.warn('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.warn(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  public login(loginData: NgForm) {
    return this.http
      .post<any>(this.apiUrl + '/users/authenticate', loginData)
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.getCurrentUser.next(this.currentUser);
          }
          return user;
        })
      );
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.getCurrentUser.next(null);
  }

  public signup(signupData: NgForm) {
    let url = this.apiUrl + '/students/';
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
    if (localStorage.getItem('currentUser')) {
      const decodedToken = helper.decodeToken(
        localStorage.getItem('currentUser')
      );

      return decodedToken._id;
    }
    return undefined;
  }

  // Test if ID belongs to currently signed in user
  public isSelf(id: string): boolean {
    return this.currentUserId === id ? true : false;
  }

  public get isStaff(): boolean {
    return this.currentUser.__t === 'Staff';
  }
}
