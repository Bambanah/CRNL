import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

const apiUrl = 'http://localhost:3000/api';

import { User } from '../_models/User';
import { Student } from '../_models/Student';
import { Team } from '../_models/Team';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getUsers() {
    return this.http.get<User[]>(apiUrl + '/users/');
  }

  getStudents() {
    return this.http.get<Student[]>(apiUrl + '/students/');
  }

  getTeams() {
    return this.http.get<Team[]>(apiUrl + '/teams/');
  }

  getUser(id: string): Observable<any> {
    const url = `${apiUrl}/users/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPosts(): Observable<any> {
    const url = `${apiUrl}/posts/`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPost(id: string): Observable<any> {
    const url = `${apiUrl}/posts/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postPost(data): Observable<any> {
    const url = `${apiUrl}/posts/`;
    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updatePost(data): Observable<any> {
    const url = `${apiUrl}/posts/`;
    return this.http
      .put(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deletePost(id: string): Observable<any> {
    const url = `${apiUrl}/posts/${id}`;
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createTeam(data): Observable<any> {
    const url = apiUrl + '/teams';
    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  addToTeam() {
    // TODO: Implement addToTeam()
  }

  removeFromTeam() {
    // TODO: Implement removeFromTeam()
  }
}
