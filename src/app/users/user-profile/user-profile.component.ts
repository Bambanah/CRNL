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
    private auth: AuthService
  ) {}

  // Variables
  isLoaded = false;
  isSelf = false;
  inTeam = false;

  userId = undefined;
  currentUserId = undefined;
  currentUserTeamId = undefined;

  // Placeholder user object
  // Overwritten with getUserDetails()
  user = {
    email: '',
    full_name: ''
  };

  // Retrieves data of visible user
  getUserDetails() {
    this.api.getUser(this.userId).subscribe(data => {
      this.user = data;
      this.isLoaded = true;
    });
  }

  sameTeam(): Boolean {
    if (!this.auth.isSelf(this.userId)) {
      return (
        this.api.getTeamIdFromUser(this.userId()) ==
        this.api.getTeamIdFromUser(this.auth.currentUserId)
      );
    }
  }

  createTeam() {
    const user_id = this.userId;
    const logged_id = this.auth.currentUserId;

    if (this.sameTeam()) {
      console.warn('Students are on the same team');
      return;
    } else if (this.inTeam || this.currentUserTeamId != undefined) {
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
    const userId = this.userId();
    const currentId = this.auth.currentUserId;
    if (!this.api.isInTeam(currentId)) {
      console.warn('Current user is not in a team');
      return;
    } else if (this.sameTeam()) {
      console.warn('User already in team');
      return;
    } else {
      this.api.addToTeam(userId).subscribe(err => {
        console.error(err);
      });
    }
  }

  removeFromTeam() {
    // TODO: Warning if removing user will delete team (only self left in team)
    const teamId = '' + this.api.getTeamIdFromUser(this.userId);
    this.api.removeFromTeam(teamId, this.userId);
    window.location.reload();
  }

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
        this.currentUserTeamId = teamId;
      });
    }

    this.isSelf = this.auth.isSelf(this.userId);

    this.getUserDetails();
  }
}
