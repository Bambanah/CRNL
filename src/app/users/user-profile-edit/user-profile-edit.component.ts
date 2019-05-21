import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AuthService } from 'src/app/_services/auth.service';

import Student from 'src/app/_models/users/Student.js';

import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {
  // TODO: Implement editing of fields

  // Font Awesome Icons
  faPlus = faPlus;
  faTimes = faTimes;

  constructor(private api: ApiService, private auth: AuthService) {}

  loading = true;

  userId: string;
  student: Student;
  skills = [];

  getStudentDetails() {
    this.api.getUser(this.userId).subscribe(
      data => {
        this.student = data;
        this.skills = data.skills;
        this.loading = false;
        console.log(this.skills);
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

  addSkill() {
    let skillName = (<HTMLInputElement>document.getElementById('skill-input'))
      .value;
    let skillType = (<HTMLInputElement>(
      document.getElementById('skill-type-select')
    )).value;

    const skillData = { name: skillName, type: skillType };

    this.skills.push(skillData);

    // this.api.updateUser(this.student.id, data).subscribe(
    //   data => {},
    //   err => {
    //     console.error(err);
    //   }
    // );
  }
}
