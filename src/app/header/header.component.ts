import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName : String;
  isAdmin : boolean = false;
  constructor(private apiService: AuthenticationService) { }

  ngOnInit() {
    this.userName = window.localStorage.getItem('user_name');
    const roles = this.apiService.getRoles();
    console.log(roles);
    if(roles.includes('ADMIN')){
      this.isAdmin =true;
    }
  }

}
