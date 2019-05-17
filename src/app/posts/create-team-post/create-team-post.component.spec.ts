import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamPostComponent } from './create-team-post.component';

describe('CreateTeamPostComponent', () => {
  let component: CreateTeamPostComponent;
  let fixture: ComponentFixture<CreateTeamPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeamPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
