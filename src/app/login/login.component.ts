import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { SharedDataService } from '../service/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: AuthenticationService,
    private sharedService : SharedDataService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.apiService.login(body.toString()).subscribe(data => {
      window.localStorage.setItem('token', JSON.stringify(data));
      this.sharedService.changeUser(this.getDecodedAccessToken(JSON.parse(JSON.stringify(data)).access_token).user_name);
      this.sharedService.changeRoles(this.getDecodedAccessToken(JSON.parse(JSON.stringify(data)).access_token).authorities);
      this.router.navigate(['']);
    }, error => {
        console.log(error);
    });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.sharedService.changeUser(null);
    this.sharedService.changeRoles(null);
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}
