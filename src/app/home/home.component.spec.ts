import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatToolbarModule,
  MatTableModule,
  MatIconModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostListComponent } from '../posts/post-list/post-list.component';
import { PostCreateComponent } from '../posts/post-create/post-create.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { CreateTeamPostComponent } from '../posts/create-team-post/create-team-post.component';
import { CreateStudentPostComponent } from '../posts/create-student-post/create-student-post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        PostListComponent,
        PostCreateComponent,
        LoadingComponent,
        CreateTeamPostComponent,
        CreateStudentPostComponent
      ],
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormsModule,
        MatToolbarModule,
        MatTableModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatIconModule,
        FontAwesomeModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // console.log('');
    expect(component).toBeTruthy();
  });
});
