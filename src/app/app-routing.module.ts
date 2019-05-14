import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamProfileComponent } from './teams/team-profile/team-profile.component';
import { StaffDashboardComponent } from './admin/staff-dashboard/staff-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileEditComponent } from './users/user-profile-edit/user-profile-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/signup',
    component: SignupComponent
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Student', 'Staff'] }
  },
  {
    path: 'users/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Student', 'Staff'] }
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { self: true }
  },
  {
    path: 'profile/edit',
    component: UserProfileEditComponent,
    canActivate: [AuthGuard],
    data: { self: true }
  },
  {
    path: 'teams',
    pathMatch: 'full',
    component: TeamListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Student', 'Staff'] }
  },
  {
    path: 'teams/:id',
    component: TeamProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Student', 'Staff'] }
  },
  {
    path: 'staff',
    redirectTo: 'staff/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'staff/dashboard',
    component: StaffDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Staff'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
