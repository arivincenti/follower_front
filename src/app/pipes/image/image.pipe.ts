import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform
{

  transform(img: string): any
  {

    //Agregar este parametro al transform si se usa el switch
    // type: string = "usuarios"

    let url = `${URL_SERVICIOS}/images`;

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
