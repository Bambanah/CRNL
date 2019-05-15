import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-team-post',
  templateUrl: './create-team-post.component.html',
  styleUrls: ['./create-team-post.component.scss']
})
export class CreateTeamPostComponent implements OnInit {
  @Output() componentIsOpen: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  closeComponent() {
    this.componentIsOpen.emit(false);
  }

  ngOnInit() {}
}
