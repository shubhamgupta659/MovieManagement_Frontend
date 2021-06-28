import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bold'
})
export class BoldPipe implements PipeTransform {

  transform(text: any, search: any, patter): string {
    if (!text || !search) {
      return text[7]+' ('+text[8]+')';
    }
    if(typeof search === 'object'){
      search = search[7];
    }
    // allow searching against any word
    const searchRegex = search
      .split(' ')
      .map(escapeRegExp)
      .map(x => `(\\s|^)${x}`)
      .join('|');
    
    const regex = new RegExp(searchRegex, 'gi');
    const bolded = text[7].replace(regex, match => `</b>${match}<b>`);
  
    return `<b>${bolded}</b>`+' ('+text[8]+')';
  }
}

function escapeRegExp(val: string): string {
  return val.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
