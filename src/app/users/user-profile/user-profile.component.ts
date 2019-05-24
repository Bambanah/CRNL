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

  isSelf = this.route.snapshot.data.self;

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

  // TODO: Remove this function once inviteToTeam is implemented
  //
  // createTeam() {
  //   const user_id = this.userId;
  //   const logged_id = this.auth.currentUserId;

  //   if (this.sameTeam) {
  //     console.warn('Students are on the same team');
  //     return;
  //   } else if (this.inTeam || this.selfInTeam) {
  //     console.warn('One or more students are already in a team');
  //     return;
  //   } else {
  //     const data = [user_id, logged_id];
  //     this.api.createTeam(data).subscribe(team => {
  //       const teamId = team._id;
  //       this.router.navigate([`/teams/${teamId}`]);
  //     });
  //   }
  // }

  inviteToTeam(invitationType: string) {
    if (!this.selfInTeam && invitationType != 'create') {
      console.warn('Current user is not in a team');
      return;
    } else if (this.sameTeam) {
      console.warn('Users already in same team');
      return;
    } else {
      this.api.inviteToTeam(this.userId, invitationType).subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.error(err);
        }
      );
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

    this.getUserDetails();
  }
}
