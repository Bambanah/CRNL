import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private api: ApiService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  teamPostOpen = true;
  studentPostOpen = false;

  teamPostHandler(isOpen: boolean) {
    this.teamPostOpen = false;
  }

  studentPostHandler(isOpen: boolean) {
    this.studentPostOpen = false;
  }

  ngOnInit() {
    this.postCreateForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    const data = [form, this.auth.currentUserId];
    this.api.postPost(data).subscribe(err => {
      console.error(err);

      window.location.reload();
    });
  }
}
