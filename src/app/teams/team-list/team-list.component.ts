import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Observable, Subject } from 'rxjs';
import { Team } from '../../_models/Team';
import { User } from '../../_models/users/User';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  constructor(private api: ApiService) {}

  displayedColumns: string[] = ['team-name', 'members'];
  teams: Team[];
  val = '';
  loading = true;

  getNameOfUser(userId) {
    return this.api.getUser(userId).pipe(
      map(user => {
        user.full_name;
      })
    );
  }

  ngOnInit() {
    this.api.getTeams().subscribe(res => {
      this.teams = res;
      this.loading = false;
    });
  }
}
