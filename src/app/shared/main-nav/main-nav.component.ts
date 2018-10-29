import { Component } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../auth/login/login.component';
import { SignupComponent } from '../../auth/signup/signup.component';
import { AuthComponent } from '../../auth/auth/auth.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, public dialog: MatDialog) {}

  isCollapsed = true;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  openAuthDialog(): void {
    const dialog = this.dialog.open(AuthComponent, {
      width: '368px'
    });
  }
}
