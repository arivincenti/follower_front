import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform
{

  transform(img: string): any
  {

    //Agregar este parametro al transform si se usa el switch
    // type: string = "usuarios"

    let url = `${environment.path}/images`;

    if (!img)
    {
      url += '/xxx';
    } else
    {
      url += `/${img}`;
    }

    return url;
  }

}
