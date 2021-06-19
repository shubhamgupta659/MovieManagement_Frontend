import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { map } from 'rxjs/operators';
import { Employee } from '../../model/employee.model';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  public tabs = [
    {name: 'IT', count : 0, color:'rgb(224,57,6)', icon:'developer_mode'},
    {name: 'HR', count : 0, color:'rgb(224,2,119)', icon:'supervised_user_circle'},
    {name: 'ACCOUNTS', count : 0, color:'rgb(173,7,85)', icon:'account_balance'}
  ]
  childProp :String;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'gender', 'department','hireDate','permanent','update','delete'];
  employeeData: any;
  public dataSource : MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  clickedRow: any;
  public selectedModule: String = 'IT';
  

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
      if(typeof list !== 'undefined'){
        this.tabs[0].count = list[0][1];
        this.tabs[1].count = list[1][1];
        this.tabs[2].count = list[2][1];
      }
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

    public redirectToDownload(){
      this.service.downloadEmployeeCSV()
    .subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			fileSaver.saveAs(blob, 'employee.csv');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
    }
    public tabClick(module:any){
      this.selectedModule =module;
      //this.dataSource.filter = this.selectedModule.trim().toLocaleLowerCase();
    }
    
}
