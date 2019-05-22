import {
  TestBed,
  async,
  ComponentFixture,
  inject,
  getTestBed
} from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { User } from '../_models/users/User';
import { first } from 'rxjs/operators';
const jwt = require('jsonwebtoken');

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  describe('#getPosts', () => {
    let form: NgForm;
    let formBuilder: FormBuilder;

    beforeEach(() => {});

    it('login should return expected url, data is ignored', () => {
      service.login(form).subscribe(value => {
        expect(value.length).toBe(1);
      });

      const req = httpTestingController.expectOne(
        service.apiUrl + '/users/authenticate'
      );
      expect(req.request.method).toBe('POST');
    });

    it('signup should return expected url, data is ignored', () => {
      service.signup(form).subscribe(value => {
        expect(value.toString).toBe(1);
      });

      const req = httpTestingController.expectOne(
        service.apiUrl + '/students/'
      );
      expect(req.request.method).toBe('POST');
    });

    it('logout is successful', () => {
      localStorage.setItem('currentUser', JSON.stringify('test'));
      service.logout();
      expect(localStorage.getItem('currentUser')).toEqual(null);
    });

    it('isAuthenticated is successful', () => {
      localStorage.setItem('currentUser', JSON.stringify('test'));
      expect(service.isAuthenticated).toEqual(true);
      service.logout();
    });

    it('isAuthenticated is unsuccessful', () => {
      service.logout();
      expect(service.isAuthenticated).toEqual(false);
    });

    it('has a current user is unsuccessful', () => {
      localStorage.setItem(
        'currentUser',
        jwt.sign(JSON.stringify('test'), 'random')
      );
      expect(service.currentUser).toEqual('test');
    });

    // it('should return expected user (called once)', () => {
    //   service = TestBed.get(AuthService);
    //   formGroup = formBuilder.group({
    //     email: ["teststudent@test.com"],
    //     password: ["password"]
    //   });
    //   expect('yo').toEqual(formGroup.value);
    //   service
    //     .login(formGroup.value)
    //     .pipe(first())
    //     .subscribe(
    //       data => {
    //           this.router.navigate([this.returnUrl]);
    //       },
    //       error => {
    //         console.warn(error);
    //         this.loading = false;
    //       }
    //     );
    //   expect(service.currentUser).toEqual('yo');
    //   // const req = httpTestingController.expectOne(`${service.apiUrl}/teams/${dummyUserData[0].id}/members`);
    //   // expect(req.request.method).toBe("GET");
    //   // req.flush(dummyFormData);
    // });
  });
});
