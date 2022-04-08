import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { debounceTime } from 'rxjs/operators';
import { User } from '../model/User';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';


function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('confirmPassword');

  if (passwordControl.pristine || confirmPasswordControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmPasswordControl.value) {
    return null;
  }
  return { match: true };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;
  user = new User();
  emailMessage: string;
  passwordMessage: string;
  pass :String;

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  private emailValidationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  private passwordValidationMessages = {
    required: 'Please enter your password.',
    pattern: 'Please enter a valid password.'
  };

  constructor(private fb: FormBuilder,private apiService: AuthenticationService,private notificationService: NotificationService,private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      userName: ['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(25),Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),this.validUsername])],
      phone: '',
      notification: 'email',
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
        confirmPassword: ['', Validators.required],
      }, { validator: passwordMatcher}),
      sendCatalog: false,
      addresses: this.fb.array([this.buildAddress()])
    });

    this.userForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    this.userForm.get('sendCatalog').valueChanges.subscribe(
      value => this.setAddrValidator(value)
    );

    const emailControl = this.userForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setEmailMessage(emailControl)
    );

    const passwordControl = this.userForm.get('passwordGroup.password');
    passwordControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setPasswordMessage(passwordControl)
    );
  }

  validUsername(fc: FormControl){
    if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc"){
      return ({validUsername: true});
    } else {
      return (null);
    }
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
    this.setAddrValidator(true);
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }


  save(): void {
    const salt = bcrypt.genSaltSync(10);
    this.pass = bcrypt.hashSync(this.userForm.value.passwordGroup.password, salt);
    this.userForm.get('passwordGroup.password').setValue(this.pass);
    this.userForm.get('passwordGroup.confirmPassword').setValue(this.pass);
    this.apiService.signup(this.userForm.value).subscribe(data=>{
    });
    this.notificationService.success('User Registered successfully');
    this.router.navigate(['/login']);
  }

  setEmailMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.emailValidationMessages[key]).join(' ');
    }
  }

  setPasswordMessage(c: AbstractControl): void {
    this.passwordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors).map(
        key => this.passwordValidationMessages[key]).join(' ');
    }
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.userForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  setAddrValidator(sendCatalog: boolean): void {
    const street1array = this.addresses.controls;
    if (sendCatalog) {
      street1array.forEach(c => {
        c.get('street1').setValidators(Validators.required);
        c.get('city').setValidators(Validators.required);
        c.get('state').setValidators(Validators.required);
        c.get('zip').setValidators(Validators.required);
      });
    } else {
      street1array.forEach(c => {
        c.get('street1').clearValidators();
        c.get('city').clearValidators();
        c.get('state').clearValidators();
        c.get('zip').clearValidators();
      });
    }
    street1array.forEach(c => {
      c.get('street1').updateValueAndValidity();
      c.get('city').updateValueAndValidity();
      c.get('state').updateValueAndValidity();
      c.get('zip').updateValueAndValidity();
    });
  }
}