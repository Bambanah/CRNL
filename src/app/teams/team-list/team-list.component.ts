import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Observable } from 'rxjs';
import { Team } from '../../_models/Team';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  displayedColumns: string[] = ['team-name', 'team-bio', 'members'];
  teams: Observable<Team>;

  constructor(private api: ApiService) {
    this.teams = api.getTeams();
  }

  ngOnInit() {}
}
