import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";

@Injectable({
  providedIn: "root"
})
export class AreasService {
  constructor(private http: HttpClient) {}

  // ==================================================
  // Get all areas
  // ==================================================
  getAreas(
    organization: OrganizationModel,
    since: number = 0,
    size: number = 0
  ) {
    return this.http
      .get(
        `${environment.path}/areas/organization/${organization._id}?since=${since}&size=${size}`
      )
      .pipe(
        map(data => {
          return data["data"];
        })
      );
  }

  // ==================================================
  // Get all areas by user
  // ==================================================
  getAreasByUser(user: UserModel) {
    return this.http.get(`${environment.path}/areas/user/${user._id}`).pipe(
      map(data => {
        return data["data"];
      })
    );
  }

  // ==================================================
  // Get Responsible Member
  // ==================================================
  getAreaResponsibleMembers(areaId: string) {
    return this.http
      .get(`${environment.path}/areas/${areaId}/responsibleMembers`)
      .pipe(
        map(data => {
          return data["data"];
        })
      );
  }

  // ==================================================
  // Get Selcted Area
  // ==================================================
  getArea(areaId: string) {
    return this.http.get(`${environment.path}/areas/${areaId}`).pipe(
      map(data => {
        return data["data"];
      })
    );
  }

  // ==================================================
  // Create a new Area
  // ==================================================
  createArea(payload: any) {
    return this.http.post(`${environment.path}/areas`, payload).pipe(
      map(data => {
        return data["data"];
      })
    );
  }

  // ==================================================
  // Update an area
  // ==================================================
  updateArea(areaId: string, payload: any) {
    return this.http.put(`${environment.path}/areas/${areaId}`, payload).pipe(
      map(data => {
        return data["data"];
      })
    );
  }

  // ==================================================
  // Delete an area
  // ==================================================
  deleteArea(payload: any) {
    return this.http.delete(`${environment.path}/areas/${payload}`).pipe(
      map(data => {
        return data["data"];
      })
    );
  }

  // ==================================================
  // Get all Area Members
  // ==================================================
  getAreaMembers(areaId: string) {
    return this.http.get(`${environment.path}/areas/${areaId}/members`).pipe(
      map(data => {
        return data["data"];
      })
    );
  }

  // ==================================================
  // Get all Area Members
  // ==================================================
  createAreaMember(payload: any) {
    return this.http
      .post(`${environment.path}/areas/create_member`, payload)
      .pipe(map(data => data["data"]));
  }

  // ==================================================
  // Desactivate all Area Members
  // ==================================================
  deleteAreaMember(payload: any) {
    return this.http
      .patch(
        `${environment.path}/areas/delete_member/${payload.area._id}`,
        payload
      )
      .pipe(
        map(data => {
          return data["data"];
        })
      );
  }

  // ==================================================
  // Desactivate all Area Members
  // ==================================================
  setResponsibleAreaMember(payload: any) {
    return this.http
      .patch(
        `${environment.path}/areas/set_responsible/${payload.area._id}`,
        payload
      )
      .pipe(
        map(data => {
          return data["data"];
        })
      );
  }
}
