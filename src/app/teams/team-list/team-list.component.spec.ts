import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListComponent } from './team-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamListComponent],
      imports: [RouterTestingModule, MatTableModule, HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
