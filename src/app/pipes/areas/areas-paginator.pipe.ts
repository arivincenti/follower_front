import { Pipe, PipeTransform } from '@angular/core';
import { AreaModel } from 'src/app/models/area.model';

@Pipe({
  name: 'areasPaginator'
})
export class AreasPaginatorPipe implements PipeTransform
{

  transform(areas: AreaModel[], since: number, until: number): AreaModel[]
  {
    return areas.slice(since, until);
  }

}
