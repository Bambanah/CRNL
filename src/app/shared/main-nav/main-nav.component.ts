import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private router: Router
  ) {}

  isCollapsed = true;
  currentUser = {
    email: '',
    full_name: '',
    __t: ''
  };

  signupRedirect() {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated;
  }

  profileRedirect(): void {
    this.router.navigate(['/profile']);
  }

  ngOnInit() {
    if (this.auth.isAuthenticated) {
      this.currentUser = this.auth.currentUser;
    }
  }
}
