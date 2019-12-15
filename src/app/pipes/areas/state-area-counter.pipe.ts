import { Pipe, PipeTransform } from '@angular/core';
import { AreaModel } from 'src/app/models/area.model';

@Pipe({
  name: 'stateAreaCounter'
})
export class StateAreaCounterPipe implements PipeTransform
{

  transform(areas: AreaModel[], filter: string): number
  {
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
