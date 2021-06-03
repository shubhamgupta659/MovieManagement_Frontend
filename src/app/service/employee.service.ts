import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Employee} from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = 'http://localhost:8081/';

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    employeeId: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(null),
    hireDate: new FormControl(new Date()),
    permanent: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      employeeId: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: null,
      hireDate: new Date(),
      permanent: false
    });
  }



  getEmployees() {
    return this.http.get(this.baseUrl + 'employee/findEmployees');
  }

  addEmployee(employee: Employee) {
    return this.http.post(this.baseUrl + 'employee/insertEmployee', employee);
  }

  getEmployeeById(id: number) {
    return this.http.get(this.baseUrl + 'employee/findEmployee/' + id);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.baseUrl + 'employee/updateEmployee/' + employee.employeeId , employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.baseUrl + 'employee/removeEmployee/' + id );
  }
}
