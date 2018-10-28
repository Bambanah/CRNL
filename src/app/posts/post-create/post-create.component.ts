import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../../_services/api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  postCreateForm: FormGroup;
  title: string;
  content: string;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postCreateForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'content' : [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postPost(form)
      .subscribe((err) => {
          console.log(err);
        });
    this.router.navigate(['/']);
  }

}
