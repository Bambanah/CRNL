import {
  TestBed
} from '@angular/core/testing';
import {
  ApiService
} from './api.service';
import {
  HttpClientModule
} from '@angular/common/http';
import { Data } from '@angular/router';

describe('ApiService', () => {
  const testStudentData: Data = {
      'age': 21,
      'major': 'Computer Science',
      'minor': 'Intelligent Systems',
      'gpa': 5.7,
      'preferred_industries': [],
      'first_name': 'Test',
      'last_name': 'Student1',
      'email': 'test1@gmail.com'
  };
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
  // it('can create new students', () => {
  //   const service: ApiService = TestBed.get(ApiService);

  //   service.postStudent(testStudentData)
  //     .subscribe(data =>
  //       console.log(data)
  //     );
  // });
});
