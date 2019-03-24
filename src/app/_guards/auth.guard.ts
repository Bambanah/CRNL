import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ApiService } from '../_services/api.service';
import { User } from '../_models/User';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      if (route.data.roles && route.data.roles.indexOf(currentUser.__t) === -1) {
        this.router.navigate(['/']);
        return false;
      }

      // Authorised
      return true;
    }

    // Not logged in so redirect to login page with return url
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
