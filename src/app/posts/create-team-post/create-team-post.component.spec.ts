import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamPostComponent } from './create-team-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';

describe('CreateTeamPostComponent', () => {
  let component: CreateTeamPostComponent;
  let fixture: ComponentFixture<CreateTeamPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTeamPostComponent, LoadingComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        FontAwesomeModule
      ]
    }).compileComponents();
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
