import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamProfileComponent } from './team-profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

describe('TeamProfileComponent', () => {
  let component: TeamProfileComponent;
  let fixture: ComponentFixture<TeamProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamProfileComponent, LoadingComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamProfileComponent);
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
