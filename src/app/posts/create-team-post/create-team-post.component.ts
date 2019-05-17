import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-create-team-post',
  templateUrl: './create-team-post.component.html',
  styleUrls: ['./create-team-post.component.scss']
})
export class CreateTeamPostComponent implements OnInit {
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
  skills = [
    { name: 'JavaScript', type: 'language' },
    { name: 'HTML', type: 'language' },
    { name: 'C#', type: 'language' },
    { name: 'CSS', type: 'language' },
    { name: 'Angular', type: 'framework' },
    { name: 'Node.js', type: 'framework' },
    { name: 'Maven', type: 'framework' },
    { name: 'Other', type: 'other' }
  ];

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

    console.log(tempForm);
    const data = [tempForm, this.auth.currentUserId];
    this.api.postPost(data).subscribe(err => {
      console.error(err);

      window.location.reload();
    });
  }

  ngOnInit() {
    this.teamPostForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required]
    });
  }
}
