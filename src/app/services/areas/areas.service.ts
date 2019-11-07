import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreasService
{

  constructor(
    private http: HttpClient
  ) { }


  getOrganizationAreas(organizationId: string)
  {
    return this.http.get(`${environment.path}/organizations/${organizationId}/areas`);
  }

}
