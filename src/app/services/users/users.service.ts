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

  getUserOrganizationAreas(user_id: string, organization_id: string)
  {
    return this.http.get(`${environment.path}/users/${user_id}/organizations/${organization_id}/areas`).pipe(
      map((data: any) =>
      {
        return data.data;
      })
    );
  }

  getUsersByEmail(payload: any)
  {
    return this.http.post(`${environment.path}/users/by_email`, payload).pipe(
      map((data: any) => data['data'])
    );
  }
}
