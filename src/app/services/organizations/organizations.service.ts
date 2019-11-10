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

  // ==================================================
  // Get one organization
  // ==================================================
  getOrganization(organization: string)
  {
    return this.http.get(`${environment.path}/organizations/${organization}`).pipe(
      map(data => data['data'])
    )
  }

  // ==================================================
  // Get user organizations
  // ==================================================
  getUserOrganizations(UserId: string)
  {
    return this.http.get(`${environment.path}/users/${UserId}/organizations`);
  }

  // ==================================================
  // Get all organization`s areas
  // ==================================================
  getOrganizationAreas(organization: string)
  {
    return this.http.get(`${environment.path}/organizations/${organization}/areas`)
      .pipe(map((data: any) => data['data']));
  }

  // ==================================================
  // Get all organization`s members
  // ==================================================
  getOrganizationMembers(organization: OrganizationModel)
  {
    return this.http.get(`${environment.path}/organizations/${organization._id}/members`).pipe(map((data: any) => data['data']));
  }

  // ==================================================
  // Get all user organization areas
  // ==================================================

  getOrganizationUserAreas(user_id: string, organization_id: string)
  {
    return this.http.get(`${environment.path}/users/${user_id}/organizations/${organization_id}/areas`).pipe(
      map((data: any) =>
      {
        return data.data;
      })
    );
  }

  // ==================================================
  // Create an organization
  // ==================================================

  createOrganization(payload: any)
  {

    return this.http.post(`${environment.path}/organizations`, payload).pipe(
      map((data: any) => data.data)
    );
  }

  // ==================================================
  // Delete an orgnization
  // ==================================================
  deleteOrganization(organization: string)
  {
    return this.http.delete(`${environment.path}/organizations/${organization}`)
  }
}
