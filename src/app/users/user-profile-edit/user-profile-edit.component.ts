import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AuthService } from 'src/app/_services/auth.service';

import Student from 'src/app/_models/users/Student.js';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {
  // TODO: Implement editing of fields

  constructor(private api: ApiService, private auth: AuthService) {}

  loading = true;

  userId: string;
  student: Student;

  getStudentDetails() {
    this.api.getUser(this.userId).subscribe(
      data => {
        this.student = data;
        this.loading = false;
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit() {
    this.userId = this.auth.currentUserId;
    this.getStudentDetails();
  }

  addSkills() {
    let skills = (<HTMLInputElement>document.getElementById('skillAdd')).value;
    this.student.skills.push(skills);
    const data = { skills: this.student.skills };

    this.api.updateUser(this.student.id, data).subscribe(
      data => {},
      err => {
        console.error(err);
      }
    );
  }
}
