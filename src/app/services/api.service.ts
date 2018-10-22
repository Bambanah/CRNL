import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};
const studentUrl = 'http://localhost:3000/api/students';
const postUrl = 'http://localhost:3000/api/posts';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getStudents(): Observable<any> {
    return this.http.get(studentUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getStudent(id: string): Observable<any> {
    const url = `${studentUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postStudent(data): Observable<any> {
    return this.http.post(studentUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateStudent(data): Observable<any> {
    return this.http.put(studentUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteStudent(id: string): Observable<{}> {
    const url = `${studentUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPosts(): Observable<any> {
    return this.http.get(postUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getPost(id: string): Observable<any> {
    const url = `${postUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postPost(data): Observable<any> {
    return this.http.post(postUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePost(data): Observable<any> {
    return this.http.put(postUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePost(id: string): Observable<{}> {
    const url = `${postUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
