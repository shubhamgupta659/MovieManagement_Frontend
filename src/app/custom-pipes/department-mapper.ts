import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'deptName'})
export class DepartmentMapPipe implements PipeTransform {
  transform(num: number): String {
    return [
      { id: 1, value: 'IT' },
      { id: 2, value: 'HR' },
      { id: 3, value: 'ACCOUNTS' },
      { id: 4, value: 'MODERATOR' }][num-1].value;
  }
}