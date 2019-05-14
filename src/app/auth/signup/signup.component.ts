import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  returnUrl = '';
  loading = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.password_confirm.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [null, Validators.email],
      full_name: [null, Validators.required],
      major: [''],
      minor: [''],
      password: [null, Validators.minLength(8)],
      password_confirm: [null, { validator: this.checkPasswords }]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loading = false;
  }

  onSubmit(form: NgForm) {
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    this.auth.signup(form).subscribe(err => {
      console.error(err);
    });

    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: this.returnUrl }
    });
  }
}
