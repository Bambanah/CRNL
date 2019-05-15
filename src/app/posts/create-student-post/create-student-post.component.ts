import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-student-post',
  templateUrl: './create-student-post.component.html',
  styleUrls: ['./create-student-post.component.scss']
})
export class CreateStudentPostComponent implements OnInit {
  @Output() componentIsOpen: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  closeComponent() {
    this.componentIsOpen.emit(false);
  }

  ngOnInit() {}
}
