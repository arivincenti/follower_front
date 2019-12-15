import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateFilterCounter'
})
export class StateFilterCounterPipe implements PipeTransform {

  transform(value: any[], filter: string): any {
    let count = 0;

    switch (filter)
    {
      case 'inactive': {
        count = value.filter(res => res.deleted_at).length;
      };
        break;
      case 'active': {
        count = value.filter(res => !res.deleted_at).length;
      };
        break;
      default: count = value.length;
    }

    return count;
  }


}
