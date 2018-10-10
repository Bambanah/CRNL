import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  constructor(private api: ApiService) { }

  students: any;

  displayedColumns = ['name', 'major', 'minor'];
  dataSource = new StudentDataSource(this.api);

  ngOnInit() {
    this.api.getStudents()
    .subscribe(res => {
      console.log(res);
      this.students = res;
    }, err => {
      console.log(err);
    });
  }
}

export class StudentDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getStudents();
  }

  disconnect() {

  }
}
