import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  private roles :String[];
  constructor(private router: Router,
    private authService: AuthenticationService,private sharedService : SharedDataService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.sharedService.roles.subscribe(data=>{
          this.roles =data;
      }); 
    if (this.roles !== null && this.authService.isUserLoggedIn()){
      if(this.roles.indexOf(route.data.role) !== -1){
        return true;
      }
    }
    this.router.navigate(['login']);
    return false;

  }

}