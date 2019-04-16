import {TestBed, async, ComponentFixture, inject, getTestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

import { User } from '../_models/users/User';
import { Student } from '../_models/users/Student';
import { Team } from '../_models/Team';
import { Post } from '../_models/Post';
import { AuthService } from './auth.service';

describe('ApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ApiService;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ApiService);
    
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getUsers', () => {
    let dummyUserData: User[];
  
      beforeEach(() => {
        service = TestBed.get(ApiService);
        dummyUserData = [
          { age: 21 , 
            major: 'Computer Science', 
            minor: 'Intelligent Systems', 
            full_name: 'Test Student 2',
            email: 'teststudent2@test.com',
            id: '5ca561173f69332cccc3860f'},
        ] as User[];
      });
  
      it('should be created', () => {
        const service: ApiService = TestBed.get(ApiService);
        expect(service).toBeTruthy();
      });
      
      it('should return expected users (called once)', () => {
        service.getUsers().subscribe(Users => {
          expect(Users.length).toBe(1);
          expect(Users).toEqual(dummyUserData);
        });
  
        const req = httpTestingController.expectOne(service.apiUrl + '/users/');
        expect(req.request.method).toBe("GET");
  
        req.flush(dummyUserData);
      });

      it('should be able to return no users', () => {
        service.getUsers().subscribe(Users => {
          expect(Users.length).toEqual(0);
          fail
        });
  
        const req = httpTestingController.expectOne(service.apiUrl + '/users/');
        req.flush([]);
      });

      it('should return expected user values with various setups', () => {
        service.getUsers().subscribe();
        service.getUsers().subscribe();
        service.getUsers().subscribe(
          users => expect(users).toEqual(dummyUserData),
          fail
        );
  
        const req = httpTestingController.match(service.apiUrl + '/users/');
        expect(req.length).toEqual(3);
  
        req[0].flush([]);
        req[1].flush([{id: 1, name: 'test'}]);
        req[2].flush(dummyUserData);
      });
      
    });

  describe('#geStudents', () => {
    let dummyStudentData: Student[];
    beforeEach(() => {
      service = TestBed.get(ApiService);
      dummyStudentData = [
        { age: 21 , 
          major: 'Computer Science', 
          minor: 'Intelligent Systems', 
          full_name: 'Test_Student',
          email: 'teststudent@test.com',
          team: '5c9325a54ee482318cfff623'},
      ] as Student[];
    });

    it('should be created', () => {
      const service: ApiService = TestBed.get(ApiService);
      expect(service).toBeTruthy();
    });
    
    it('should return expected students (called once)', () => {
      service.getStudents().subscribe(students => {
        expect(students.length).toBe(1);
        expect(students).toEqual(dummyStudentData);
      });

      const req = httpTestingController.expectOne(service.apiUrl + '/students/');
      expect(req.request.method).toBe("GET");

      req.flush(dummyStudentData);
    });

    it('should be able to return no students', () => {
      service.getStudents().subscribe(students => {
        expect(students.length).toEqual(0);
        fail
      });

      const req = httpTestingController.expectOne(service.apiUrl + '/students/');
      req.flush([]);
    });

    it('should return expected student values with various setups', () => {
      service.getStudents().subscribe();
      service.getStudents().subscribe();
      service.getStudents().subscribe(
        students => expect(students).toEqual(dummyStudentData),
        fail
      );

      const req = httpTestingController.match(service.apiUrl + '/students/');
      expect(req.length).toEqual(3);

      req[0].flush([]);
      req[1].flush([{id: 1, name: 'test'}]);
      req[2].flush(dummyStudentData);
    });

  });

  describe('#getTeams', () => {
    let dummyTeamData: Team[];
  
    beforeEach(() => {
      service = TestBed.get(ApiService);
      dummyTeamData = [
        { members:["5c5579075eca471af42544c4","5c93b1ed8b44f40bf8486708"],
          _id:"5c9af54eb226cd3e0c238190",
          name:"Test name",
          bio:"Test bio",}
      ] as Team[];
    });

    it('should be created', () => {
      const service: ApiService = TestBed.get(ApiService);
      expect(service).toBeTruthy();
    });
    
    it('should return expected teams (called once)', () => {
      service.getTeams().subscribe(teams => {
        expect(teams.length).toBe(1);
        expect(teams).toEqual(dummyTeamData);
      });

      const req = httpTestingController.expectOne(service.apiUrl + '/teams/');
      expect(req.request.method).toBe("GET");

      req.flush(dummyTeamData);
    });

    it('should be able to return no teams', () => {
      service.getTeams().subscribe(teams => {
        expect(teams.length).toEqual(0);
        fail
      });

      const req = httpTestingController.expectOne(service.apiUrl + '/teams/');
      req.flush([]);
    });

    it('should return expected team values with various setups', () => {
      service.getTeams().subscribe();
      service.getTeams().subscribe();
      service.getTeams().subscribe(
        teams => expect(teams).toEqual(dummyTeamData),
        fail
      );

      const req = httpTestingController.match(service.apiUrl + '/teams/');
      expect(req.length).toEqual(3);

      req[0].flush([]);
      req[1].flush([{id: 1, name: 'test'}]);
      req[2].flush(dummyTeamData);
    });
  });

  describe('#getPosts', () => {
    let dummyPostData: Post[];
  
    beforeEach(() => {
      service = TestBed.get(ApiService);
      dummyPostData = [
        { members:["5c5579075eca471af42544c4","5c93b1ed8b44f40bf8486708"],
          _id:"5c9af54eb226cd3e0c238190",
          name:"Test name",
          bio:"Test bio",}
      ] as Post[];
    });

    it('should be created', () => {
      const service: ApiService = TestBed.get(ApiService);
      expect(service).toBeTruthy();
    });
    
    it('should return expected posts (called once)', () => {
      service.getPosts().subscribe(posts => {
        expect(posts.length).toBe(1);
        expect(posts).toEqual(dummyPostData);
      });

      const req = httpTestingController.expectOne(service.apiUrl + '/posts/');
      expect(req.request.method).toBe("GET");

      req.flush(dummyPostData);
    });

    it('should be able to return no posts', () => {
      service.getPosts().subscribe(posts => {
        expect(posts.length).toEqual(0);
        fail
      });

      const req = httpTestingController.expectOne(service.apiUrl + '/posts/');
      req.flush([]);
    });

    it('should return expected team values with various setups', () => {
      service.getPosts().subscribe();
      service.getPosts().subscribe();
      service.getPosts().subscribe(
        posts => expect(posts).toEqual(dummyPostData),
        fail
      );

      const req = httpTestingController.match(service.apiUrl + '/posts/');
      expect(req.length).toEqual(3);

      req[0].flush([]);
      req[1].flush([{id: 1, name: 'test'}]);
      req[2].flush(dummyPostData);
    });
  });


  describe('#getUser', () => {
    let dummyUserData: User;
  
      beforeEach(() => {
        service = TestBed.get(ApiService);
        dummyUserData = [
          { age: 21 , 
            major: 'Computer Science', 
            minor: 'Intelligent Systems', 
            full_name: 'Test Student 2',
            email: 'teststudent2@test.com',
            id: '5ca561173f69332cccc3860f'},
        ] as User;
      });
  
      it('should be created', () => {
        const service: ApiService = TestBed.get(ApiService);
        expect(service).toBeTruthy();
      });
      
      it('should return expected users (called once)', () => {
        service.getUser('5ca561173f69332cccc3860f').subscribe(User => {
          expect(User.length).toBe(1);
          expect(User).toEqual(dummyUserData);
        });
  
        const req = httpTestingController.expectOne(service.apiUrl + '/users/5ca561173f69332cccc3860f');
        expect(req.request.method).toBe("GET");
  
        req.flush(dummyUserData);
      });

      it('should not be able to return user', () => {
        service.getUser('5ca561173f69332cccc3860f').subscribe(Users => {
          expect(Users.length).toEqual(0);
          fail
        });
  
        const req = httpTestingController.expectOne(service.apiUrl + '/users/5ca561173f69332cccc3860f');
        req.flush([]);
      });

      it('should return expected user values with various setups', () => {
        service.getUser('5ca561173f69332cccc3860f').subscribe();
        service.getUser('5ca561173f69332cccc3860f').subscribe();
        service.getUser('5ca561173f69332cccc3860f').subscribe(
          user => expect(user).toEqual(dummyUserData),
          fail
        );
  
        const req = httpTestingController.match(service.apiUrl + '/users/5ca561173f69332cccc3860f');
        expect(req.length).toEqual(3);
  
        req[0].flush([]);
        req[1].flush([{id: 1, name: 'test'}]);
        req[2].flush(dummyUserData);
      });
      
    });
  
});



  // it('should see what happens', async(inject( [ApiService], ( apiService ) => {
  //   apiService = TestBed.get(ApiService);
  //   apiService.getStudents().subscribe( result => {
  //     expect(result.length).toBeGreaterThan(0);
  //   })
    
  //   // const students = [ "Bob", "Mark" ];
  //   // fixture.whenStable().then(() => {
  //   //   expect( component.getStudents ).toBeDefined();
  //   //   expect( component.getStudents.length ).toEqual( 0 );
  //   //   setTimeout( () => api.next( students ), 3000 );
  //   // }).then( () => {
  //   //   expect( component.getStudents.length ).toEqual( 2 );
  //   //   expect( component.getStudents ).toEqual( students );
  //   // });
  // })));

