import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentPostComponent } from './create-student-post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('CreateStudentPostComponent', () => {
  let component: CreateStudentPostComponent;
  let fixture: ComponentFixture<CreateStudentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStudentPostComponent],
      imports: [FontAwesomeModule, RouterTestingModule, HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudentPostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  // it('should create', () => {

  //   expect(component).toBeTruthy();
  // });
});
