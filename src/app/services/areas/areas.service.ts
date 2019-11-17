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

  getAreaResponsibleMembers(areaId: string)
  {
    return this.http.get(`${environment.path}/areas/${areaId}/responsibleMembers`).pipe(map((data: any) => data.data));
  }

  getselectedArea(areaId: string)
  {
    return this.http.get(`${environment.path}/areas/${areaId}`).pipe(map((data: any) => data.data));
  }

  createArea(payload: any)
  {
    return this.http.post(`${environment.path}/areas`, payload).pipe(map((data: any) => data.data));
  }

  getAreaMembers(areaId: string){
    return this.http.get(`${environment.path}/areas/${areaId}/members`).pipe(map((data: any) => data.data));
  }

}
