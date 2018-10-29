import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private auth: AuthService) { }

  user = {};
  isSelf = false;

  getUserDetails(id) {
    this.api.getUser(id).subscribe(data => {
      this.user = data;
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.getUserDetails(id);
    this.isSelf = this.auth.isSelf(id);
  }
}
