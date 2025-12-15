import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterActive',
})
export class FilterActivePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
