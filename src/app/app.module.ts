import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatToolbarModule,
  MatDialogModule,
  MatTabsModule
} from '@angular/material';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { MainNavComponent } from './shared/main-nav/main-nav.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideProfileComponent } from './side-profile/side-profile.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { LoginModalComponent } from './auth/login-modal/login-modal.component';
import { SignupModalComponent } from './auth/signup-modal/signup-modal.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamProfileComponent } from './teams/team-profile/team-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    MainNavComponent,
    PostCreateComponent,
    PostListComponent,
    SideProfileComponent,
    SearchBarComponent,
    LoginComponent,
    SignupComponent,
    UserListComponent,
    UserProfileComponent,
    TeamListComponent,
    TeamProfileComponent,
    LoginModalComponent,
    SignupModalComponent,
    SignupPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    MatDialogModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
