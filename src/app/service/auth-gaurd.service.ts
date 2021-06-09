import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles = this.authService.getRoles();
    if (roles !== null && this.authService.isUserLoggedIn()){
      if(roles.includes(route.data.role)){
        return true;
      }
    }
    this.router.navigate(['login']);
    return false;

  }

}