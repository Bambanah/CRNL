import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  studentForm: FormGroup;
  first_name: string;
  last_name: string;
  major: string;
  minor: string;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      'first_name' : [null, Validators.required],
      'last_name' : [null, Validators.required],
      'major' : [null, Validators.required],
      'minor' : [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postStudent(form)
      .subscribe(res => {
          console.log('this far');
          const id = res['id'];
          console.log(res);
          console.log(id);
          this.router.navigate(['/students', id]);
        }, (err) => {
          console.log(err);
        });
  }

}
