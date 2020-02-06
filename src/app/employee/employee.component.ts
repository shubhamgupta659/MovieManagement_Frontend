import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../service/employee.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private notificationService: NotificationService) { }

  departments = [
    { id: 1, value: 'IT' },
    { id: 2, value: 'HR' },
    { id: 3, value: 'ACCOUNTS' }];

  ngOnInit() {
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    console.log(this.service.form.value);
    this.service.addEmployee(this.service.form.value).subscribe(data => {
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
    });
  }
}
