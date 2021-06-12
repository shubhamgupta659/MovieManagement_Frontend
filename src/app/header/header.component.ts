import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { SharedDataService } from '../service/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName : String;
  isAdmin : boolean = false;
  constructor(private apiService: AuthenticationService,private sharedService : SharedDataService) { }

  ngOnInit() {
    this.sharedService.user.subscribe(data=>{
      this.userName = data;
    });
    this.sharedService.roles.subscribe(data=>{
      if(data !== null && data.indexOf('ADMIN') !== -1){
        this.sharedService.isAdminChange(true);
      }
    });  
    this.sharedService.isAdmin.subscribe(data=>{
      this.isAdmin = data;
    });  
  }

}
