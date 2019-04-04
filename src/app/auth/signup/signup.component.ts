import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { first } from 'rxjs/operators';

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

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [null, Validators.required],
      full_name: [null, Validators.required],
      major: [null, Validators.required],
      minor: [null, Validators.required],
      password: [null, Validators.required],
      password_confirm: [null, Validators.required]
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
