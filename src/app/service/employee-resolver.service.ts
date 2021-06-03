import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Employee, EmployeeResolved } from '../model/employee.model';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolver implements Resolve<EmployeeResolved> {
  constructor(private employeeService : EmployeeService){}

  resolve(route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot) : Observable<EmployeeResolved>{
      const id = +route.paramMap.get('id');
      if(isNaN(+id)){
        const message = `Employee Id is not a Number : ${id}`;
        console.error(message);
        return of({employee : null,error:message});
      }
      return this.employeeService.getEmployeeById(id).
      pipe(
        map(employee => ({employee:employee})),
        catchError(error=>{
          const message =`Retreval Error : ${error}`;
          console.error(message);
          return of({employee : null,error:message});
        })
      );
    }
}