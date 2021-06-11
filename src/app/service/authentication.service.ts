import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private sharedService : SharedDataService) { }

  login(loginPayload) {
    return this.http.post('http://localhost:8081/' + 'oauth/token', loginPayload);
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('token');
    return !(user === null)
  }

  logOut() {
    localStorage.clear();
    this.sharedService.changeUser(null);
    this.sharedService.changeRoles(null);
  }
}
