import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-team-post',
  templateUrl: './create-team-post.component.html',
  styleUrls: ['./create-team-post.component.scss']
})
export class CreateTeamPostComponent implements OnInit {
  @Output() componentIsOpen: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

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

  // Close creation and go back to selection
  closeComponent() {
    this.componentIsOpen.emit(false);
  }

  ngOnInit() {}
}
