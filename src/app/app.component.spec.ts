import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MainNavComponent} from './shared/main-nav/main-nav.component';
import {FooterComponent} from './shared/footer/footer.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoginModalComponent} from './auth/login-modal/login-modal.component';
import {SignupModalComponent} from './auth/signup-modal/signup-modal.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainNavComponent,
        FooterComponent,
        LoginModalComponent,
        SignupModalComponent,
        LoginComponent,
        SignupComponent,
      ],
      imports: [
        RouterTestingModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
