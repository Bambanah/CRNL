import {TestBed} from '@angular/core/testing';
import {ApiService} from './api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Data} from '@angular/router';

describe('ApiService', () => {
  const testStudentData: Data = {
    age: 21,
    major: 'Computer Science',
    minor: 'Intelligent Systems',
    gpa: 5.7,
    preferred_industries: [],
    first_name: 'Test',
    last_name: 'Student1',
    email: 'test1@gmail.com',
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
