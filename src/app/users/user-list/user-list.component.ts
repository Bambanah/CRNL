import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any;

  inTeam: false;
  inSameTeam: false;

  constructor(private api: ApiService, private config: NgbDropdownConfig) {
    config.placement = 'right-top';
    config.autoClose = true;
  }

  ngOnInit() {
    this.api.getStudents().subscribe(
      res => {
        this.users = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
