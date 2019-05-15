import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-single-post',
  templateUrl: './create-single-post.component.html',
  styleUrls: ['./create-single-post.component.scss']
})
export class CreateSinglePostComponent implements OnInit {
  @Output() componentIsOpen: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  closeComponent() {
    this.componentIsOpen.emit(false);
  }

  ngOnInit() {}
}
