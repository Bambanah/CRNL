import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { Parser } from 'json2csv';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent implements OnInit {
  students: any;
  teams: any;

  constructor(private api: ApiService) {}

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
    );
  }

  downloadFile(data: any, file_name: string) {
    var blob = new Blob([data], { type: 'text/csv' });
    saveAs(blob, file_name + '.csv');
  }

  syncParser(data: string) {
    const fields = ['id', 'full_name', 'email', 'major', 'minor', 'team'];
    const opts = { fields };
    let csv = '';
    const parser = new Parser(opts);
    csv = parser.parse(data);
    return csv;
  }

  downloadStudent(id: string) {
    this.api.getUser(id).subscribe(
      res => {
        let csv = '';
        csv = this.syncParser(res);
        this.downloadFile(csv, id);
      },
      err => {
        console.warn(err);
      }
    );
  }

  downloadAllStudents() {
    let csv = this.syncParser(this.students);
    this.downloadFile(csv, 'Students');
  }
}
