import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  constructor(private api: ApiService) { }

  students: any;

  displayedColumns = ['name', 'major', 'minor'];
  dataSource = new StudentDataSource(this.api);

  ngOnInit() { }
}

export class StudentDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getStudents();
  }

  disconnect() {}
}
