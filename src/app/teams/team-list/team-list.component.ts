import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Observable } from 'rxjs';
import { Team } from '../../_models/Team';
import { User } from '../../_models/users/User';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  displayedColumns: string[] = ['team-name', 'team-bio', 'members'];
  teams: Observable<Team>;
  members: [Observable<User>];
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.teams = this.api.getTeams();
    this.teams.forEach(team => {
      team.members.forEach(member => {
        team.members.member = this.api.getUser(member);
        // TODO: Display member names instead of ID
      });
    });

  }
}
