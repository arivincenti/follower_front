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
    return this.http.get(`${environment.path}/organizations/${organization}/areas`);
  }

  getOrganizationMembers(organization: OrganizationModel)
  {
    return this.http.get(`${environment.path}/organizations/${organization._id}/members`).pipe(
      map((data: any) =>
      {
        return data['data'];
      })
    );
  }

  getOrganization(organization: string)
  {
    return this.http.get(`${environment.path}/organizations/${organization}`).pipe(
      map(data => data['data'])
    )
  }

  deleteOrganization(organization: OrganizationModel)
  {
    return this.http.delete(`${environment.path}/organizations/${organization._id}`)
  }
}
