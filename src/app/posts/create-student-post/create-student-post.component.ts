import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-student-post',
  templateUrl: './create-student-post.component.html',
  styleUrls: ['./create-student-post.component.scss']
})
export class CreateStudentPostComponent implements OnInit {
  @Output() componentIsOpen: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  // FontAwesome Icons
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

  closeComponent() {
    this.componentIsOpen.emit(false);
  }

  ngOnInit() {}
}
