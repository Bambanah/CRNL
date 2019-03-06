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

  user = {};

  getUserId() {
    return this.route.snapshot.params['id'];
  }

  getUserDetails() {
    const id = this.getUserId();
    this.api.getUser(id).subscribe(data => {
      this.user = data;
    });
  }

  isSelf(): Boolean {
    const id = this.getUserId();
    return this.auth.isSelf(id);
  }

  isInTeam(): Boolean {
    return false;
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  addToTeam() {
    const user_id = this.getUserId();
    const logged_id = this.auth.getCurrentUserId();
    this.api.createTeam(user_id, logged_id);
  }

  ngOnInit() {
    this.getUserDetails();
  }
}
