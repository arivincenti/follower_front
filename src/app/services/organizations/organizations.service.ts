import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { OrganizationModel } from 'src/app/models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService
{

  constructor(
    private http: HttpClient
  ) { }

  getUserOrganizations(UserId: string)
  {
    return this.http.get(`${environment.path}/users/${UserId}/organizations`);
  }

  getOrganizationAreas(organization: string)
  {
    return this.http.get(`${environment.path}/organizations/${organization}/areas`)
    .pipe(map((data: any) => data['data']));
  }

  getOrganizationMembers(organization: OrganizationModel)
  {
    return this.http.get(`${environment.path}/organizations/${organization._id}/members`).pipe(map((data: any) => data['data']));
  }

  getOrganizationUserAreas(user_id: string, organization_id: string)
  {
    return this.http.get(`${environment.path}/users/${user_id}/organizations/${organization_id}/areas`).pipe(
      map((data: any) =>
      {
        return data.data;
      })
    );
  }

  getOrganization(organization: string)
  {
    return this.http.get(`${environment.path}/organizations/${organization}`).pipe(
      map(data => data['data'])
    )
  }

  createOrganization(payload: any){

    return this.http.post(`${environment.path}/organizations`, payload).pipe(
      map((data: any) => data.data)
    );
  }

  deleteOrganization(organization: OrganizationModel)
  {
    return this.http.delete(`${environment.path}/organizations/${organization._id}`)
  }
}
