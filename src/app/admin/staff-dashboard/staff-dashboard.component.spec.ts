import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { StaffDashboardComponent } from './staff-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { defer } from 'rxjs/internal/observable/defer';

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const studentsServiceStub = {
  get() {
    return fakeAsyncResponse([{ id: 1 }]);
  }
};

describe('StaffDashboardComponent', () => {
  let component: StaffDashboardComponent;
  let fixture: ComponentFixture<StaffDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffDashboardComponent],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(StaffDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(StaffDashboardComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create?', () => {
    component.ngOnInit();
    console.log(component['api'].getStudents());
  });

  // it('should see what happens', async(() => {
  //   const students = ['Bob', 'Mark'];
  //   fixture
  //     .whenStable()
  //     .then(() => {
  //       expect(component.students).toBeDefined();
  //       expect(component.students.length).toEqual(0);
  //       // setTimeout( () => api.next( students ), 3000 );
  //       return fixture.whenStable();
  //     })
  //     .then(() => {
  //       expect(component.students.length).toEqual(2);
  //       expect(component.students).toEqual(students);
  //     });
  // }));

  it('should see what happensg', () => {
    var container = document.getElementById('container');
    const teams = container.querySelectorAll('.test');
    expect(teams).not.toBeNull;
    expect(teams.length).toEqual(0);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(teams).not.toBeNull;
      expect(teams.length).toEqual(0);
    });
  });

  it('should see what happensh', () => {
    var container = document.getElementById('container');
    const teams = container.querySelectorAll('.test');
    expect(teams).not.toBeNull;
    expect(teams.length).toEqual(0);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(teams).not.toBeNull;
      expect(teams.length).toEqual(0);
    });
  });
});
