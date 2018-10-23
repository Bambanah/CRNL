import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {



  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  student = {};

  getStudentDetails(id) {
    this.api.getStudent(id)
      .subscribe(data => {
        this.student = data;
      });
  }

  ngOnInit() {
    this.getStudentDetails(this.route.snapshot.params['id']);
  }

}
