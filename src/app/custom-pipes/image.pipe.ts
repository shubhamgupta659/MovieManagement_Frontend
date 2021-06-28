import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(response: any): any {
    let blob: any = new Blob([response], { type: 'image/jpeg;base64' });
    let url = 'data:image/jpeg;base64,' + response;  
    return url;
  }

}
