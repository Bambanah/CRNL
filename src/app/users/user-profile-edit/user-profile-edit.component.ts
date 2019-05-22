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

    this.api.addSkillToStudent(this.student.id, skillData).subscribe(
      data => {
        this.skills.push(data);
      },
      err => {
        console.error(err);
      }
    );
  }

  removeSkill(skill: any) {
    this.api.removeSkillFromStudent(this.student.id, skill).subscribe(
      data => {
        console.log('Skill removed');
      },
      err => {
        console.error(err);
      }
    );
    this.skills = this.skills.filter(function(arraySkill) {
      return arraySkill._id != skill._id;
    });
  }
}
