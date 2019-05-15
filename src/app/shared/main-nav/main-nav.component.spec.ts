import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainNavComponent } from './main-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import {LoginModalComponent} from 'src/app/auth/login-modal/login-modal.component';
// import {SignupModalComponent} from 'src/app/auth/signup-modal/signup-modal.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainNavComponent,
        // LoginModalComponent,
        // SignupModalComponent,
        LoginComponent,
        SignupComponent
      ],
      imports: [
        MatToolbarModule,
        RouterTestingModule,
        NgbModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
