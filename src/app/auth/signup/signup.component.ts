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
  studentForm: FormGroup;
  email: string;
  password: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.auth.signup(form).subscribe(err => {
      console.log(err);
    });
    this.router.navigate(['login']);
  }
}
