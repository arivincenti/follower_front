import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AreasService
{

  constructor(
    private http: HttpClient
  ) { }

  // ==================================================
  // Get Responsible Member
  // ==================================================
  getAreaResponsibleMembers(areaId: string)
  {
    return this.http.get(`${environment.path}/areas/${areaId}/responsibleMembers`).pipe(map((data: any) => data.data));
  }

  // ==================================================
  // Get Selcted Area
  // ==================================================
  getselectedArea(areaId: string)
  {
    return this.http.get(`${environment.path}/areas/${areaId}`).pipe(map((data: any) => data.data));
  }

  // ==================================================
  // Create a new Area
  // ==================================================
  createArea(payload: any)
  {
    return this.http.post(`${environment.path}/areas`, payload).pipe(map((data: any) => data.data));
  }

  // ==================================================
  // Delete an area
  // ==================================================
  deleteArea(payload: any)
  {
    return this.http.delete(`${environment.path}/areas`, payload).pipe(map((data: any) => data.data));
  }

  // ==================================================
  // Get all Area Members
  // ==================================================
  getAreaMembers(areaId: string)
  {
    return this.http.get(`${environment.path}/areas/${areaId}/members`).pipe(map((data: any) => data.data));
  }

}
