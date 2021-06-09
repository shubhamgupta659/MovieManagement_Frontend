import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginPayload) {
    return this.http.post('http://localhost:8081/' + 'oauth/token', loginPayload);
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('token');
    return !(user === null)
  }

  logOut() {
    localStorage.clear();
  }

  getRoles(){
    return window.localStorage.getItem('authorities');
  }
}
