import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
}
