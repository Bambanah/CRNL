import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentPostComponent } from './create-student-post.component';

describe('CreateStudentPostComponent', () => {
  let component: CreateStudentPostComponent;
  let fixture: ComponentFixture<CreateStudentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStudentPostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
