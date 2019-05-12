import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AuthService } from 'src/app/_services/auth.service';

import { Student } from 'src/app/_models/users/Student.js';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {
  // TODO: Implement editing of fields

  constructor(private api: ApiService, private auth: AuthService) {}

  userId: string;
  student: Student;

  ngOnInit() {
    this.userId = this.auth.currentUserId;
    this.student = this.auth.currentUser;
  }
}
