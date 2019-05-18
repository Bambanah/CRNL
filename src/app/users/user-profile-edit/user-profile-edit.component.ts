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

  userId: string;
  student: Student;

  ngOnInit() {
    // this.student.find({ full_name: 'Test Student'});
    this.userId = this.auth.currentUserId;
    this.student = this.auth.currentUser;
    console.log(this.student.skills);
  }

  addSkills(){
    let skills = (<HTMLInputElement>document.getElementById('skillAdd')).value;
    this.student.skills.push(skills);
    const data = {skills: this.student.skills};
    console.log(data);
    skills = "";
    this.api.updateUser(this.student.id, data)
      .subscribe(err => {
        console.error(err);
      }
    );
    
    console.log(this.student.id + "::" + data);
  }
}
