import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
        fixture.detectChanges();
      });
  }));
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have submit button be unable to sumbit without compete form`, async(() => {
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click;
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalledTimes(0);
    });
  }));

  it(`should have submit button be able to sumbit with compete form`, () => {
    component.ngOnInit;
    component.signupForm.controls['email'].setValue('test@test.com');
    component.signupForm.controls['first_name'].setValue('Bill');
    component.signupForm.controls['last_name'].setValue('Gates');
    component.signupForm.controls['major'].setValue('Computer Science');
    component.signupForm.controls['minor'].setValue('minor');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['password_confirm'].setValue('password');
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click;
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    });
  }); //only works when not async for some reason?

  it(`should have signupForm be invalid with empty form`, async(() => {
    component.ngOnInit;
    expect(component.signupForm.valid).toBeFalsy();
  }));

  it(`should have signupForm be valid with completed form`, async(() => {
    component.ngOnInit;
    component.signupForm.controls['email'].setValue('test@test.com');
    component.signupForm.controls['first_name'].setValue('Bill');
    component.signupForm.controls['last_name'].setValue('Gates');
    component.signupForm.controls['major'].setValue('Computer Science');
    component.signupForm.controls['minor'].setValue('minor');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['password_confirm'].setValue('password_conf');
    expect(component.signupForm.valid).toBeTruthy();
  }));

  it(`login link should route to login page when pressed`, async(() => {
    let href = fixture.debugElement
      .query(By.css('a'))
      .nativeElement.getAttribute('href');
    expect(href).toEqual('/auth/login');
  }));

  // it(`should have is_student be falsy if #student is not checked`, () =>{
  //   expect(component.is_student).toBeFalsy;
  // });

  // it(`should have is_student be truthy if #student is checked`, () =>{
  //   el = fixture.debugElement.query(By.css('#student')).nativeElement;
  //   el.click;
  //   fixture.whenStable().then(() => {
  //     expect(component.is_student).toBeTruthy;
  //   });
  // });

  it(`should have signupForm's email reflect form conponent #email`, () => {
    el = fixture.debugElement.query(By.css('#email')).nativeElement;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.signupForm.get('email').value).toEqual('');
    });
  });

  it(`should have signupForm's first_name reflect form component #first_name`, () => {
    el = fixture.debugElement.query(By.css('#first_name')).nativeElement;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.signupForm.get('first_name').value).toEqual('');
    });
  });

  it(`should have signupForm's last_name reflect form component #last_name`, () => {
    el = fixture.debugElement.query(By.css('#last_name')).nativeElement;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.signupForm.get('last_name').value).toEqual('');
    });
  });

  it(`should have signupForm's password reflect form conponent #password`, () => {
    el = fixture.debugElement.query(By.css('#password')).nativeElement;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.signupForm.get('password').value).toEqual('');
    });
  });

  it(`should have signupForm's major reflect form component #major`, () => {
    el = fixture.debugElement.query(By.css('#major')).nativeElement;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.signupForm.get('major').value).toEqual('');
    fixture.whenStable().then(() => {});
  });

  it(`should have signupForm's minor reflect form conponent #minor`, () => {
    el = fixture.debugElement.query(By.css('#minor')).nativeElement;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.signupForm.get('minor').value).toEqual('');
    });
  });
});
