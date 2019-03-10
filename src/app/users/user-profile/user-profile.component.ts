import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { AuthService } from 'src/app/_services/auth.service';
import { stringify } from 'querystring';

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
    const id = this.getUserId();
    this.api.getUser(id).subscribe(data => {
      this.user = data;
      this.isLoaded = true;
    });
  }

  isInTeam(userId: string): boolean {
    let team = '';
    this.api.getTeamIdFromUser(userId).subscribe(data => {
      team = data;
    });

    if (team) return true;
    return false;
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
      this.isInTeam(this.getUserId()) ||
      this.isInTeam(this.auth.getCurrentUserId())
    ) {
      console.warn('One or more students are already in a team');
      return;
    } else {
      const data = [user_id, logged_id];
      this.api.createTeam(data).subscribe(team => {
        const teamId = team._id;
        console.log(team);
        this.router.navigate([`/teams/${teamId}`]);
      });
    }
  }

  addToTeam() {
    const userId = this.getUserId();
    this.api.addToTeam(userId).subscribe(err => {
      console.error(err);
    });
  }

  removeFromTeam() {
    // TODO: Warning if removing user will delete team (only self left in team)
    const userId = this.getUserId();
    const teamId = '' + this.api.getTeamIdFromUser(userId);
    this.api.removeFromTeam(teamId, userId);
  }

  ngOnInit() {
    this.inTeam = this.isInTeam(this.getUserId());
    this.isSelf = this.auth.isSelf(this.getUserId());
    this.getUserDetails();
  }
}
