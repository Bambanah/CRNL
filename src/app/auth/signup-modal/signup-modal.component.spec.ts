import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignupModalComponent} from './signup-modal.component';
import {SignupComponent} from '../signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SignupModalComponent', () => {
  let component: SignupModalComponent;
  let fixture: ComponentFixture<SignupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupModalComponent, SignupComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
