import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {Student} from './student';
import { STUDENTS } from './mock-students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  getStudents(): Observable<Student[]> {
    return of(STUDENTS);
  }

  getStudent(id: number): Observable<Student> {
    return of(STUDENTS.find(student => student.id === id));
  }
}
