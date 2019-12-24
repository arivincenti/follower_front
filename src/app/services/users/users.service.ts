import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService
{

  constructor(
    private http: HttpClient
  ) { }

  getUsersByEmail(payload: any)
  {
    return this.http.post(`${environment.path}/users/by_email`, payload).pipe(
      map((data: any) => data['data'])
    );
  }

  getUserImage(user: UserModel)
  {
    var image = 'abc';

    if(user.img){
      image = user.img;
    }

    return this.http.get(`${environment.path}/images/${image}`);
  }
}
