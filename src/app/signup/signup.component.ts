import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup;
  pass :String;
  constructor(private fb: FormBuilder,private apiService: AuthenticationService,private notificationService: NotificationService,private router: Router) { }
  

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(25)])],
      lastName: ['',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(25)])],
      email: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      username: ['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(25),Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),this.validUsername])],
      password: ['',Validators.compose([Validators.required,Validators.minLength(5),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
      confirmPassword: ['',Validators.compose([Validators.required])]
   });
  }
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    this.pass = bcrypt.hashSync(this.userForm.value.password, salt);
    this.userForm.controls.password.setValue(this.pass);
    this.userForm.controls.confirmPassword.setValue(this.pass);
    this.apiService.signup(this.userForm.value).subscribe(data=>{
    });
    this.notificationService.success('User Registered successfully');
    this.router.navigate(['/login']);
  }

  validUsername(fc: FormControl){
    if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc"){
      return ({validUsername: true});
    } else {
      return (null);
    }
  }
  validationMessages = {
    'firstName': [
      { type: 'required', message: 'first name is required' },
      { type: 'minlength', message: 'first name must be at least 2 characters long' },
      { type: 'maxlength', message: 'first name cannot be more than 25 characters long' },
    ],
    'lastName': [
      { type: 'required', message: 'last name is required' },
      { type: 'minlength', message: 'last name must be at least 2 characters long' },
      { type: 'maxlength', message: 'last name cannot be more than 25 characters long' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ]
    }
}
