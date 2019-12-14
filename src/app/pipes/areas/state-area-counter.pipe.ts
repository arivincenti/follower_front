import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateAreaCounter'
})
export class StateAreaCounterPipe implements PipeTransform {

  transform(areas: any, filter: any): any {
    let count = 0;

    switch (filter)
    {
      case 'inactive': {
        count = areas.filter(area => area.deleted_at).length;
      };
        break;
      case 'active': {
        count = areas.filter(area => !area.deleted_at).length;
      };
        break;
      default: count = areas.length;
    }

    return count;
  }

}
