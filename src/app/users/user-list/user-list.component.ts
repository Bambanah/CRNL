import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  constructor(
    private api: ApiService,
    private config: NgbDropdownConfig,
    private auth: AuthService
  ) {
    config.placement = 'right-top';
    config.autoClose = true;
  }

  users: any;

  inTeam: boolean;

  inSameTeam(userId): boolean {
    return false;
  }

  ngOnInit() {
    if (this.auth.currentUser) {
      this.inTeam = this.auth.currentUser.team != undefined;
    }

    this.api.getStudents().subscribe(
      res => {
        this.users = res.filter(user => user._id != this.auth.currentUserId);
      },
      err => {
        console.error(err);
      }
    );
  }
}
