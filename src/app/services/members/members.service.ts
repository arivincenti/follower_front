import { Injectable } from "@angular/core";
import { MemberModel } from "src/app/models/member.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { OrganizationModel } from "src/app/models/organization.model";

@Injectable({
  providedIn: "root"
})
export class MembersService {
  constructor(private http: HttpClient) {}

  getMembers(organization: OrganizationModel) {
    return this.http
      .get(`${environment.path}/members/organization/${organization._id}`)
      .pipe(map(data => data["data"]));
  }

  getMember(memberId: string) {
    return this.http.get(`${environment.path}/members/${memberId}`).pipe(
      map(data => {
        return data["data"];
      })
    );
  }

  getMembersByEmail(payload: any) {
    console.log("email by member");
    return this.http
      .post(`${environment.path}/members/by_email`, payload)
      .pipe(map(data => data["data"]));
  }

  getMemberAreas(user_id: string, organization_id: string) {
    return this.http
      .get(
        `${environment.path}/members/user/${user_id}/organization/${organization_id}/areas`
      )
      .pipe(
        map(data => {
          return data["data"];
        })
      );
  }

  createMember(member: any) {
    return this.http
      .post(`${environment.path}/members`, member)
      .pipe(map(data => data["data"]));
  }

  updateMember(member: MemberModel) {
    return this.http
      .put(`${environment.path}/members/${member._id}`, member)
      .pipe(
        map(data => {
          return data["data"];
        })
      );
  }

  inactiveMember(member: MemberModel) {
    return this.http.delete(`${environment.path}/members/${member._id}`).pipe(
      map(data => {
        return data["data"];
      })
    );
  }
}
