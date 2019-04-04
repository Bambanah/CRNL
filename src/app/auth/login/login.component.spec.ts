import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

//added for testing
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { error } from '@angular/compiler/src/util';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have submit button be unable to sumbit without compete form`, () => {
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click;
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalledTimes(0);
    });
  });

  it(`should have submit button be able to sumbit with compete form`, () => {
    component.ngOnInit;
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('password')
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click;
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it(`should have loginform be invalid with empty form`, () => {
    component.ngOnInit;
    expect(component.loginForm.valid).toBeFalsy();
  });

  it(`should have loginform be valid with completed form`, () => {
    component.ngOnInit;
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('password')
    expect(component.loginForm.valid).toBeTruthy();
  });

  it(`should not have submit influence returnUrl's value`, () => {
    component.returnUrl = '/test'
    component.onSubmit(component.loginForm.value);
    expect(component.returnUrl).toEqual('/test');
  });

  it('should set submitted to be true with generic form submit', async(() =>{
    const testForm = <NgForm>{
      value: {
          name: "name",
          category: "category"
      }
    };
    component.onSubmit(testForm);
    expect(component.submitted).toBeTruthy();
  }));

  it('should set submitted to be true with loginform sumbit', async(() =>{
    component.ngOnInit;
    component.onSubmit(component.loginForm.value);
    expect(component.submitted).toBeTruthy();
  }));

  it(`should have submitted be 'true' after onSubmit`, async(() =>{
    component.ngOnInit;
    component.onSubmit(component.loginForm.value);
    expect(component['submitted']).toEqual(true);
  }));

  it(`should have submitted be 'false' before onSubmit`, async(() =>{
    component.ngOnInit;
    expect(component['submitted']).toEqual(false);
  }));

  it('should have loading be false with incomplete form', async(() =>{
    component.ngOnInit;
    component.onSubmit(component.loginForm.value);
    expect(component.loading).toEqual(false);
  }));

  it('should have loading be true with complete form', async(() =>{
    component.ngOnInit;
    component.loginForm.get('email').setValue('www.test@test.com');
    component.loginForm.get('password').setValue('test');
    component.onSubmit(component.loginForm.value);
    expect(component.loading).toEqual(true);
  }));

  it('should have loginform value reflect the most recent value', async(() =>{
    component.ngOnInit;
    component.loginForm.get('email').setValue('www.1@1.com');
    component.loginForm.get('email').setValue('www.2@2.com');
    expect(component.loginForm.get('email').value).toEqual('www.2@2.com');
  }));

  it(`should have returnUrl contain single '/' if init`, async(() =>{
    component.ngOnInit;
    expect(component.returnUrl).toEqual('/');
  }));

  it('should have ngOnInit run on init', async(() =>{
    expect(component.returnUrl).toEqual('/');
  }));


  it('should logout current user on attempted login', async(() =>{
    component.ngOnInit;
    expect(component['authService'].isAuthenticated()).toEqual(false);
  }));

  it(`signup link should route to signup page when pressed`, () => {
    let href = fixture.debugElement.query(By.css('a')).nativeElement
    .getAttribute('href');
    expect(href).toEqual('/auth/signup');
  });

  it(`should have loginForm's email reflect form component #email`, () =>{
    el = fixture.debugElement.query(By.css('#email')).nativeElement;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loginForm.get('email').value).toEqual('');
    });
  });

  it(`should have loginForm's password reflect form component #password`, () =>{
    el = fixture.debugElement.query(By.css('#password')).nativeElement;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loginForm.get('password').value).toEqual('');
    });
  });
});
