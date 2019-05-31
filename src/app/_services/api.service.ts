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
      console.warn('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.warn(
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

  // validateData() {
  //   return this.http.get(this.apiUrl + '/validate/');
  // }

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

  updateUser(userId: string, userData): Observable<User> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http
      .put(url, userData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  addSkillToStudent(userId: string, skillData) {
    const url = `${this.apiUrl}/users/${userId}/skills/add`;
    return this.http
      .put(url, skillData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  removeSkillFromStudent(userId: string, skill) {
    const url = `${this.apiUrl}/users/${userId}/skills/remove`;
    return this.http
      .put(url, skill, httpOptions)
      .pipe(catchError(this.handleError));
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

  createTeam(studentId1: string, studentId2: string): Observable<any> {
    const url = this.apiUrl + '/teams';
    const data = {
      studentId1,
      studentId2
    };

    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  sendInvitation(userId: string, invitationType: string) {
    const url = `${this.apiUrl}/invite/send`;
    const data = {
      hostId: this.auth.currentUserId,
      guestId: userId,
      invitationType: invitationType
    };

    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  acceptInvitation(userId: string, invitationId: string) {
    this.getUser(userId).subscribe(data => {
      const student = data;

      const invitation = student.invitations.filter(x =>
        x._id.toString().includes(invitationId)
      )[0];

      if (invitation) {
        if (invitation.invitationType == 'create') {
          this.createTeam(userId, invitation.invitedById).subscribe(
            data => {
              this.dismissInvitation(userId, invitation.invitedById).subscribe(
                data => {},
                err => {
                  this.handleError(err);
                }
              );
            },
            err => {
              this.handleError(err);
            }
          );
        } else if (invitation.invitationType == 'add') {
          this.addToTeam(userId, invitation.invitedById).subscribe(
            data => {
              this.dismissInvitation(userId, invitation.invitedById).subscribe(
                data => {},
                err => {
                  this.handleError(err);
                }
              );
            },
            err => {
              this.handleError(err);
            }
          );
        }
      }
    });
  }

  dismissInvitation(userId: string, invitedById: string) {
    const url = `${this.apiUrl}/invite/dismiss`;

    const data = {
      invitedId: userId,
      invitedById: invitedById
    };

    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  addToTeam(userId: string, hostId: string) {
    const url = `${this.apiUrl}/teams/add/`;
    const data = {
      hostId,
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
