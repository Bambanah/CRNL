import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListComponent } from './team-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamListComponent, LoadingComponent],
      imports: [RouterTestingModule, MatTableModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
