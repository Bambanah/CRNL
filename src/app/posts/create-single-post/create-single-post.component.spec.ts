import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSinglePostComponent } from './create-single-post.component';

describe('CreateSinglePostComponent', () => {
  let component: CreateSinglePostComponent;
  let fixture: ComponentFixture<CreateSinglePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSinglePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSinglePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
