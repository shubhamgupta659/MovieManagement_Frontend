import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../../service/employee.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private notificationService: NotificationService,private router: Router) { }

  departments = [
    { id: 1, value: 'IT' },
    { id: 2, value: 'HR' },
    { id: 3, value: 'ACCOUNTS' },
    { id: 4, value: 'MODERATOR' }];

  ngOnInit() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    this.service.addEmployee(this.service.form.value).subscribe(data => {
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Employee Added successfully');
      this.router.navigate(['employee/viewEmployee']);
    });
  }
}
