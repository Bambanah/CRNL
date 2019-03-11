import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import {
  Router,
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

  teamId = this.route.snapshot.params['id'];

  leaveTeam() {
    const currentUserId = this.auth.getCurrentUserId();
    this.api.removeFromTeam(this.teamId, currentUserId);
  }

  deleteTeam() {
    console.log(this.teamId);
    this.api.deleteTeam(this.teamId).subscribe(err => {
      console.error(err);
    });
    this.router.navigateByUrl('/teams/');
    window.location.reload();
  }

  ngOnInit() {}
}
