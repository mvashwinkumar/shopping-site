import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'strtrunc'})
export class StringTruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    let strLen = value.length;
    if(strLen > maxLength) {
        value = value.substring(0,maxLength-3);
        value += '...';
    } else {
        let diff = maxLength - strLen;
        value += new Array(diff + 1).join(' ');
    }
    return value;
  }
}
