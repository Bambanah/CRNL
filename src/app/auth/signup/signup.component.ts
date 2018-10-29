import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  email: string;
  password: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit(form: NgForm) {
    this.auth.signup(form).subscribe(err => {
      console.log(err);
    });
    this.router.navigate(['auth/login']);
  }
}
