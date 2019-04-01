import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamProfileComponent} from './team-profile.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TeamProfileComponent', () => {
  let component: TeamProfileComponent;
  let fixture: ComponentFixture<TeamProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamProfileComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
