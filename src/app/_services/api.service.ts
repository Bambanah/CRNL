import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { User } from '../_models/users/User';
import { Student } from '../_models/users/Student';
import { Team } from '../_models/Team';
import { Post } from '../_models/Post';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = '/api';
  constructor(private http: HttpClient, private auth: AuthService) {}

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
      return Promise.resolve(error);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl + '/users/');
  }

  getStudents() {
    return this.http.get<Student[]>(this.apiUrl + '/students/');
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl + '/teams/');
  }

  getTeam(teamId: string): Observable<Team> {
    const url = `${this.apiUrl}/teams/${teamId}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getUser(userId: string): Observable<User> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPosts(): Observable<Post> {
    const url = `${this.apiUrl}/posts/`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPost(postId: string): Observable<Post> {
    const url = `${this.apiUrl}/posts/${postId}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postPost(data): Observable<Post> {
    const url = `${this.apiUrl}/posts/`;
    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updatePost(postData): Observable<Post> {
    const url = `${this.apiUrl}/posts/`;
    return this.http
      .put(url, postData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deletePost(postId: any | number | string): Observable<any> {
    const url = `${this.apiUrl}/posts/${postId}`;
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createTeam(data): Observable<any> {
    const url = this.apiUrl + '/teams';
    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  addToTeam(userId: string) {
    const url = `${this.apiUrl}/teams/add/`;
    const data = {
      hostId: this.auth.currentUserId,
      guestId: userId
    };
    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  removeFromTeam(teamId: string, userId: string) {
    const url = `${this.apiUrl}/teams/${teamId}/remove/${userId}`;
    return this.http.post(url, httpOptions).pipe(catchError(this.handleError));
  }

  deleteTeam(teamId: string) {
    const url = `${this.apiUrl}/teams/${teamId}`;
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getTeamIdFromUser(userId: string) {
    const url = `${this.apiUrl}/users/${userId}/team/`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getMembersOfTeam(teamId: string) {
    const url = `${this.apiUrl}/teams/${teamId}/members`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  isInTeam(userId: string): boolean {
    const teamId = this.getTeamIdFromUser(userId);
    return teamId != undefined;
  }
}
