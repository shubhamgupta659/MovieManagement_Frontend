import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private userSubject : BehaviorSubject<String>;
  public user : Observable<String>;
  private rolesSubject : BehaviorSubject<String[]>;
  public roles : Observable<String[]>;

  constructor() {
    this.userSubject = new BehaviorSubject<String>(null);
    this.user = this.userSubject.asObservable(); 
    this.rolesSubject = new BehaviorSubject<String[]>(null);
    this.roles = this.rolesSubject.asObservable();
  }

public editDataDetails: any = [];
public subject = new Subject<any>();
private messageSource = new  BehaviorSubject(this.editDataDetails);
currentMessage = this.messageSource.asObservable();

changeMessage(message: string) {
this.messageSource.next(message);
}

changeUser(user: string) {
  this.userSubject.next(user);
  }

changeRoles(roles: string[]) {
    this.rolesSubject.next(roles);
  }

}
