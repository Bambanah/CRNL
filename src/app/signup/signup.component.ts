import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  signupData = { email:'', password:'' };
  message = '';

  ngOnInit() {
  }

  signup() {
    console.log(this.signupData);
    this.http.post('/api/students/',this.signupData).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['login']);
    }, err => {
      this.message = err.error.msg;
    });
  }

}
