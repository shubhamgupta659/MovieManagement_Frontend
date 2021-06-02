import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { map } from 'rxjs/operators';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'gender', 'department','details','update','delete'];
  employeeData: any;
  public dataSource : MatTableDataSource<Employee>;
  clickedRows = new Set<Employee>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: EmployeeService) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
      this.employeeData = list;
      this.dataSource = new MatTableDataSource<Employee>(this.employeeData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
    }

    public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
    
    public redirectToDetails = (id: string) => {
    
    }
    public redirectToUpdate = (id: string) => {
      
    }
    public redirectToDelete = (id: string) => {
      
    }
    
}
