import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AuthService } from 'src/app/_services/auth.service';

import Student from 'src/app/_models/users/Student.js';

import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';

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

  studentId: string;
  student: Student;
  skills = [];
  personalForm: FormGroup;

  ngOnInit() {
    this.studentId = this.auth.currentUserId;
    this.getStudentDetails();
  }

  getStudentDetails() {
    this.api.getUser(this.studentId).subscribe(
      data => {
        this.student = data;
        this.skills = data.skills;

        this.personalForm = new FormGroup({
          email: new FormControl(this.student.email),
          firstName: new FormControl(this.student.name.first),
          lastName: new FormControl(this.student.name.last),
          major: new FormControl(this.student.major),
          firstMinor: new FormControl(this.student.minors.first),
          secondMinor: new FormControl(this.student.minors.second)
        });

        this.loading = false;
      },
      err => {
        console.error(err);
      }
    );
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

  personalSubmit() {
    const email = this.personalForm.value.email;
    const name = {
      first: this.personalForm.value.firstName,
      last: this.personalForm.value.lastName
    };
    const data = { email, name };

    this.api.updateUser(this.studentId, data).subscribe(data => {
      console.log(data);
    });
    console.log(this.personalForm.value);
  }
}
