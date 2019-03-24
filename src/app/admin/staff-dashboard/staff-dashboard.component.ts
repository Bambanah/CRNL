import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent implements OnInit {

  students: any;
  teams: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getStudents().subscribe(
      res => {
        this.students = res;
      },
      err => {
        console.warn(err);
      }
    );

    this.api.getTeams().subscribe(
      res => {
        this.teams = res;
      },
      err => {
        console.warn(err);
      }
    )
  }

}
