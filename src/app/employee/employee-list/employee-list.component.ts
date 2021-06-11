import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { map } from 'rxjs/operators';
import { Employee } from '../../model/employee.model';
import { Router } from '@angular/router';
import { HttpRequestService } from '../../service/http-request.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  public tabs = [
    {name: 'IT', count : 6, color:'rgb(224,57,6)', icon:'developer_mode'},
    {name: 'HR', count : 2, color:'rgb(224,2,119)', icon:'supervised_user_circle'},
    {name: 'ACCOUNTS', count : 1, color:'rgb(173,7,85)', icon:'account_balance'}
  ]
  childProp :String;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'gender', 'department','hireDate','permanent','update','delete'];
  employeeData: any;
  public dataSource : MatTableDataSource<Employee>;
  clickedRow: any;
  public selectedModule: String = 'IT';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: EmployeeService,private notificationService: NotificationService,private router: Router) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
      this.employeeData = list;
      this.dataSource = new MatTableDataSource<Employee>(this.employeeData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
      this.service.getCountsByDepartment().subscribe(
        list => {
        this.setTabData(list);
        });
    }

    public setTabData(list:any){
      this.tabs[0].count = list[0][1];
      this.tabs[1].count = list[1][1];
      this.tabs[2].count = list[2][1];
    }
    public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
    
    public redirectToDetails = (id: string) => {
    
    }
    public redirectToDelete = (row: any) => {
      this.service.deleteEmployee(row.employeeId)
      .subscribe( data => {
        this.employeeData = this.employeeData.filter(u => u.employeeId !== row.employeeId);
        this.dataSource = new MatTableDataSource<Employee>(this.employeeData);
        this.notificationService.success('Employee Deleted successfully');
        this.router.navigate(['/employee/viewEmployee']);
      })
      
    }
    public rowClick(row:any){
      this.clickedRow = row;
    }

    public redirectToUpdate(row: any) {
      this.router.navigate(['/employee/editEmployee',row.employeeId]);
    }

    public redirectToAdd() {
      this.router.navigate(['/employee/addEmployee']);
    }

    public tabClick(module:any){
      this.selectedModule =module;
      //this.dataSource.filter = this.selectedModule.trim().toLocaleLowerCase();
    }
    
}
