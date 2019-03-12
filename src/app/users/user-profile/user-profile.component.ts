import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  // Returns ID of currently visible user
  getUserId() {
    return this.route.snapshot.params['id'];
  }

  // Retrieves data of visible user
  getUserDetails() {
    this.api.getUser(this.userId).subscribe(data => {
      this.user = data;
      this.isLoaded = true;
    });
  }

  sameTeam(): Boolean {
    return (
      this.api.getTeamIdFromUser(this.getUserId()) ==
      this.api.getTeamIdFromUser(this.auth.getCurrentUserId())
    );
  }

  createTeam() {
    const user_id = this.getUserId();
    const logged_id = this.auth.getCurrentUserId();

    if (this.sameTeam()) {
      console.warn('Students are on the same team');
      return;
    } else if (
      this.inTeam ||
      this.currentUserTeamId != undefined
    ) {
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
    const userId = this.getUserId();
    const currentId = this.auth.getCurrentUserId();
    if (!this.api.isInTeam(currentId)) {
      console.warn('Current user is not in a team');
      return;
    } else if (this.sameTeam()) {
      console.warn('User already in team');
      return;
    }else {
      this.api.addToTeam(userId).subscribe(err => {
        console.error(err);
      });
    }
  }

  removeFromTeam() {
    // TODO: Warning if removing user will delete team (only self left in team)
    const userId = this.getUserId();
    const teamId = '' + this.api.getTeamIdFromUser(userId);
    this.api.removeFromTeam(teamId, userId);
    window.location.reload();
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.currentUserId = this.auth.getCurrentUserId();

    this.api.getUser(this.getUserId()).subscribe(user => {
      this.inTeam = (user.team != undefined);
    });

    this.isSelf = this.auth.isSelf(this.userId);
    this.api.getTeamIdFromUser(this.currentUserId).subscribe(teamId => {
      this.currentUserTeamId = teamId;
    });

    this.getUserDetails();
  }
}
