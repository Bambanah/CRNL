import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-student-post',
  templateUrl: './create-student-post.component.html',
  styleUrls: ['./create-student-post.component.scss']
})
export class CreateStudentPostComponent implements OnInit {
  @Output() componentIsOpen: EventEmitter<boolean> = new EventEmitter();

  teamPostForm: FormGroup;
  content: FormControl;
  title: FormControl;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  // Font Awesome Icon
  faPlus = faPlus;
  faTimes = faTimes;

  // Mock skills
  loading = true;
  student: any;
  skills = [];

  industries = ['Design', 'Full-Stack Development', 'Finance'];

  // Close creation and go back to selection
  closeComponent() {
    this.componentIsOpen.emit(false);
  }

  onSubmit() {
    let tempForm = {
      content: String,
      title: String
    };

    // tempForm.industries = this.industries;

    tempForm.title = this.teamPostForm.get('title').value;
    tempForm.content = this.teamPostForm.get('content').value;

    const data = [tempForm, this.auth.currentUserId];
    this.api.postPost(data).subscribe(err => {
      console.warn(err);

      window.location.reload();
    });
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
        console.warn(err);
      }
    );
  }

  removeSkill(skill: any) {
    this.api.removeSkillFromStudent(this.student.id, skill).subscribe(
      data => {},
      err => {
        console.warn(err);
      }
    );
    this.skills = this.skills.filter(function(arraySkill) {
      return arraySkill._id != skill._id;
    });
  }

  ngOnInit() {
    this.api.getUser(this.auth.currentUserId).subscribe(
      data => {
        this.student = data;
        this.skills = data.skills;
        this.loading = false;
      },
      err => {
        console.warn(err);
      }
    );
    this.teamPostForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required]
    });
  }
}
