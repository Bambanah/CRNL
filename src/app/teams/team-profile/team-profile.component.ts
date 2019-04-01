import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  loading = true;

  teamId = this.route.snapshot.params['id'];
  members = {};

  leaveTeam() {
    const currentUserId = this.auth.currentUserId;
    this.api.removeFromTeam(this.teamId, currentUserId);
  }

  deleteTeam() {
    this.api.deleteTeam(this.teamId).subscribe(err => {
      console.warn(err);
    });
    this.router.navigateByUrl('/teams/');
    window.location.reload();
  }

  getMembers() {
    this.api.getMembersOfTeam(this.teamId).subscribe(data => {
      this.members = data;
      this.loading = false;
    });
  }

  removeUser(userId: any | string | number) {
    this.api.removeFromTeam(this.teamId, userId).subscribe(err => {
      console.error(err);
    });
    window.location.reload();
  }

  ngOnInit() {
    this.getMembers();
  }
}
