import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public auth: AuthService
  ) {}

  // Variables
  userId = this.route.snapshot.params['id'];
  currentUserId = this.auth.currentUserId;
  currentUserTeamId: string;

  isSelf = this.auth.isSelf(this.userId);

  inTeam: boolean;
  selfInTeam: boolean;

  isLoaded = false;

  // Placeholder user object
  // Overwritten with getUserDetails()
  user = {
    email: '',
    full_name: '',
    major: '',
    minor: '',
    team: ''
  };

  // Retrieves data of visible user
  getUserDetails() {
    this.api.getUser(this.userId).subscribe(data => {
      this.user = data;
      this.isLoaded = true;
    });
  }

  get sameTeam(): Boolean {
    if (!this.auth.isSelf(this.userId)) {
      return (
        this.api.getTeamIdFromUser(this.userId) ==
        this.api.getTeamIdFromUser(this.auth.currentUserId)
      );
    }
  }

  createTeam() {
    const user_id = this.userId;
    const logged_id = this.auth.currentUserId;

    if (this.sameTeam) {
      console.warn('Students are on the same team');
      return;
    } else if (this.inTeam || this.selfInTeam) {
      console.warn('One or more students are already in a team');
      return;
    } else {
      const data = [user_id, logged_id];
      this.api.createTeam(data).subscribe(team => {
        const teamId = team._id;
        this.router.navigate([`/teams/${teamId}`]);
      });
    }
  }

  addToTeam() {
    if (!this.selfInTeam) {
      console.warn('Current user is not in a team');
      return;
    } else if (this.sameTeam) {
      console.warn('Users already in same team');
      return;
    } else {
      this.api.addToTeam(this.userId).subscribe(err => {
        console.error(err);
      });
      window.location.reload();
    }
  }

  removeFromTeam() {
    const teamId = '' + this.api.getTeamIdFromUser(this.userId);
    this.api.removeFromTeam(teamId, this.userId);
    window.location.reload();
  }

  editProfile() {}

  ngOnInit() {
    if (this.route.snapshot.data.self === true) {
      this.userId = this.auth.currentUserId;
    } else {
      this.userId = this.route.snapshot.params['id'];
      this.currentUserId = this.auth.currentUserId;

      this.api.getUser(this.userId).subscribe(user => {
        this.inTeam = user.team != undefined;
      });

      this.api.getTeamIdFromUser(this.currentUserId).subscribe(teamId => {
        if (teamId != undefined) {
          this.currentUserTeamId = JSON.stringify(teamId);
          this.selfInTeam = true;
        } else {
          this.selfInTeam = false;
        }
      });
    }

    if (!this.isSelf) {
      this.getUserDetails();
    }
  }
}
