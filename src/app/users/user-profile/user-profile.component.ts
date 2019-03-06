import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Team } from '../../_models/Team';
import { useAnimation } from '@angular/animations';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService
  ) {}

  isLoaded = false;
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

  isInTeam(): Boolean {
    // TODO: Implement - auth user is in a team
    return false;
  }

  sameTeam(): Boolean {
    // TODO: Implement - users are in same team
    return false;
  }

  createTeam() {
    const user_id = this.getUserId();
    const logged_id = this.auth.getCurrentUserId();
    const data = [user_id, logged_id];
    this.api.createTeam(data).subscribe(err => {
      console.log(err);
    });
  }

  removeFromTeam() {
    // TODO: Implement - remove user from team
    // Warning if removing user will delete team
    this.api.removeFromTeam();
  }

  ngOnInit() {
    this.getUserDetails();
  }
}
