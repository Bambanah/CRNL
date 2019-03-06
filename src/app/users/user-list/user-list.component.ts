import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Observable } from 'rxjs';
import { User } from '../../_models/User.js';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['full_name', 'major', 'minor', 'email'];
  users: Observable<User>;

  constructor(private api: ApiService, private router: Router) {
    this.users = api.getStudents();
  }

  ngOnInit() {}
}
