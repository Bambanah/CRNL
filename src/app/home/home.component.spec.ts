import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SideProfileComponent } from '../side-profile/side-profile.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { StudentsComponent } from '../students/students.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule, MatSelectModule, MatToolbarModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostListComponent } from '../posts/post-list/post-list.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        SideProfileComponent,
        SearchBarComponent,
        StudentsComponent,
        PostListComponent
      ],
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormsModule,
        MatToolbarModule,
        MatTableModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
