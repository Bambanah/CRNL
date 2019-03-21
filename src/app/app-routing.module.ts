import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { Role } from './_models/role';

import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamProfileComponent } from './teams/team-profile/team-profile.component';
import { StaffDashboardComponent } from './admin/staff-dashboard/staff-dashboard.component';

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
    component: LoginPageComponent
  },
  {
    path: 'auth/signup',
    component: SignupPageComponent
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Student', 'Staff']}
  },
  {
    path: 'users/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Student', 'Staff']}
  },
  {
    path: 'teams',
    component: TeamListComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Student', 'Staff']}
  },
  {
    path: 'teams/:id',
    component: TeamProfileComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Student', 'Staff']}
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
    data: {roles: ['Staff']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
