import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { WebsocketService } from "../websocket/websocket.service";
import { OrganizationModel } from "src/app/models/organization.model";

@Injectable({
  providedIn: "root"
})
export class OrganizationsService {
  constructor(private http: HttpClient, private wsService: WebsocketService) {}

  // ==================================================
  // Get one organization
  // ==================================================
  getOrganization(organization: string) {
    return this.http
      .get(`${environment.path}/organizations/${organization}`)
      .pipe(map(data => data["data"]));
  }

  // ==================================================
  // Get user organizations
  // ==================================================
  getOrganizations(UserId: string) {
    // return this.http.get(`${environment.path}/users/${UserId}/organizations`);
    return this.http.get(`${environment.path}/organizations/user/${UserId}`);
  }

  // ==================================================
  // Create Organization
  // ==================================================
  createOrganization(payload: any) {
    return this.http
      .post(`${environment.path}/organizations`, payload)
      .pipe(map(data => data["data"]));
  }

  // ==================================================
  // Update an orgnization
  // ==================================================
  updateOrganization(organization: string, name: string) {
    return this.http
      .put(`${environment.path}/organizations/${organization}`, name)
      .pipe(map(data => data["data"]));
  }

  // ==================================================
  // Activate an orgnization
  // ==================================================
  activateOrganization(payload: any) {
    return this.http
      .patch(
        `${environment.path}/organizations/activate_organization/${payload.organization._id}`,
        payload
      )
      .pipe(map(data => data["data"]));
  }

  // ==================================================
  // Desactivate an orgnization
  // ==================================================
  desactivateOrganization(payload: any) {
    return this.http
      .patch(
        `${environment.path}/organizations/desactivate_organization/${payload.organization._id}`,
        payload
      )
      .pipe(map(data => data["data"]));
  }
}
