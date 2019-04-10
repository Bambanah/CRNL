import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../../_services/api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  postCreateForm: FormGroup;
  title: string;
  content: string;

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.postCreateForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    const data = [form.title, form.content, this.auth.currentUserId];
    this.api.postPost(data).subscribe(err => {
      console.error(err);
    });
    this.router.navigate(['']);
  }
}
