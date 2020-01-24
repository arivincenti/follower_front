import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

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
  getOrganizations(UserId: string)
  {
    // return this.http.get(`${environment.path}/users/${UserId}/organizations`);
    return this.http.get(`${environment.path}/organizations/user/${UserId}`);
  }

  // ==================================================
  // Get all user organization areas
  // ==================================================
  // getOrganizationUserAreas(user_id: string, organization_id: string)
  // {
  //   return this.http.get(`${environment.path}/users/${user_id}/organizations/${organization_id}/areas`).pipe(
  //     map((data: any) =>
  //     {
  //       return data.data;
  //     })
  //   );
  // }

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
  // Update an orgnization
  // ==================================================
  updateOrganization(organization: string, name: string)
  {
    return this.http.put(`${environment.path}/organizations/${organization}`, name).pipe(
      map((data: any) => data.data)
    );
  }

  // ==================================================
  // Delete an orgnization
  // ==================================================
  deleteOrganization(organization: string)
  {
    return this.http.delete(`${environment.path}/organizations/${organization}`).pipe(
      map((data: any) => data.data)
    );
  }

}
