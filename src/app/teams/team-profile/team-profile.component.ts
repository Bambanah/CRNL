import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.scss']
})
export class TeamProfileComponent implements OnInit {
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private teamId = this.route.snapshot.params['id'];

  leaveTeam() {
    console.log('test');
    const currentUserId = this.auth.getCurrentUserId();
    this.api.removeFromTeam(this.teamId, currentUserId);
  }

  deleteTeam() {
    this.api.deleteTeam(this.teamId);
  }

  ngOnInit() {}
}
