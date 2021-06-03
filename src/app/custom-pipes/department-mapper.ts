import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'deptName'})
export class DepartmentMapPipe implements PipeTransform {
  transform(num: number): String {
    return [
      { id: 1, value: 'IT' },
      { id: 2, value: 'HR' },
      { id: 3, value: 'ACCOUNTS' }][num-1].value;
  }
}