export class Employee {

    employeeId: number;
    fullName: String;
    email: String;
    mobile: String;
    city: String;
    gender: String;
    department: number;
    hireDate: String;
    permanent: boolean;
  }

export interface EmployeeResolved{
  employee :any;
  error?: any;
}