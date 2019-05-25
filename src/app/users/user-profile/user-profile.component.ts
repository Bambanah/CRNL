import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  invitedToTeam: boolean;

  isLoaded = false;

  // Placeholder user object
  // Overwritten with getUserDetails()
  user = {
    email: '',
    full_name: '',
    name: {
      first: '',
      last: ''
    },
    major: '',
    minor: '',
    team: '',
    invitations: {
      invitedById: '',
      invitationType: ''
    }
  };

  ngOnInit() {
    if (this.route.snapshot.data.self === true) {
      this.userId = this.auth.currentUserId;
    } else {
      this.userId = this.route.snapshot.params['id'];
      this.currentUserId = this.auth.currentUserId;

      this.api.getUser(this.userId).subscribe(user => {
        this.inTeam = user.team != undefined;
        if (
          user.invitations.filter(x =>
            x.invitedById.toString().includes(this.currentUserId)
          ).length > 0
        ) {
          this.invitedToTeam = true;
        }
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

  inviteToTeam(invitationType: string) {
    if (!this.selfInTeam && invitationType != 'create') {
      console.warn('Current user is not in a team');
      return;
    } else if (this.sameTeam) {
      console.warn('Users already in same team');
      return;
    } else {
      this.api.sendInvitation(this.userId, invitationType).subscribe(
        (data: Object) => {
          this.invitedToTeam = true;
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  acceptInvitation(invitationId: string) {
    this.api.acceptInvitation(this.userId, invitationId);
  }

  dismissInvitation() {
    this.api.dismissInvitation(this.userId, this.currentUserId).subscribe(
      data => {
        this.invitedToTeam = false;
      },
      err => {
        console.error(err);
      }
    );
  }

  removeFromTeam() {
    const teamId = '' + this.api.getTeamIdFromUser(this.userId);
    this.api.removeFromTeam(teamId, this.userId);
    window.location.reload();
  }
}
