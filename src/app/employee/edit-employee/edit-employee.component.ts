import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../service/employee.service';
import { HttpRequestService } from '../../service/http-request.service';
import { NotificationService } from '../../service/notification.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { DepartmentMapPipe } from 'src/app/custom-pipes/department-mapper';

@Component({
  selector: 'edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee :Employee;
  form: FormGroup;

  constructor(private service: EmployeeService, private notificationService: NotificationService,private router: Router, private apiService: HttpRequestService, private route:ActivatedRoute) { }

  departments = [
    { id: 1, value: 'IT' },
    { id: 2, value: 'HR' },
    { id: 3, value: 'ACCOUNTS' }];

  ngOnInit() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getEmployeeById(id)
    .subscribe( data => {
      this.service.form.patchValue(data);
      //this.service.form.controls.department.setValue(this.deptPipe.transform(this.service.form.get('hireDate').value));
      //this.service.form.controls.department.setValue(2);
      this.service.form.controls.hireDate.setValue(new Date(this.service.form.get('hireDate').value));
    });
  }

//   compareFn(object1: any, object2: any) {
//     return object1 && object2 && object1.id == object2.id;
// }

  public onEditClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  public onEditSubmit() {
    this.service.addEmployee(this.service.form.value).subscribe(data => {
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Employee Added successfully');
      this.router.navigate(['/viewEmployee']);
    });
  }
}
