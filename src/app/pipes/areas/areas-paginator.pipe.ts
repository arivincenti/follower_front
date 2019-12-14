import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'areasPaginator'
})
export class AreasPaginatorPipe implements PipeTransform {

  transform(areas: any, desde, hasta): any { 
    return areas.slice(desde, hasta);
  }

}
