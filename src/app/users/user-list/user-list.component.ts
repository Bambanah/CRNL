import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ApiService} from '../../_services/api.service';
import { Observable } from 'rxjs';
import {User} from '../../_models/User.js';

export interface UserData {
  name: string;
  major: string;
  minor: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'major', 'minor', 'email'];
  users: Observable<User>;

  constructor(private api: ApiService) {
    this.users = api.getUsers();
  }

  ngOnInit() {
  }

}
