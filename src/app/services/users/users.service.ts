import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { updateTicketList } from "src/app/store/actions/userOrganizations/tickets/userTickets/userTickets.actions";
import { updateTicketSuccess } from "src/app/store/actions/userOrganizations/tickets/ticket/ticket/ticket.actions";
import { updateOrganizationList } from "src/app/store/actions/userOrganizations/organizations/organizations.actions";
import { updateOrganizationSuccess } from "src/app/store/actions/userOrganizations/selectedOrganization/organization.actions";
import { updateAreasList } from "src/app/store/actions/userOrganizations/selectedOrganization/areas/areas/areas.actions";
import { updateAreaSuccess } from "src/app/store/actions/userOrganizations/selectedOrganization/areas/area/area.actions";
import {
  AddCreatedMemberToList,
  updateMemberList
} from "src/app/store/actions/userOrganizations/selectedOrganization/members/members/members.actions";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getUsersByEmail(payload: any) {
    return this.http
      .post(`${environment.path}/users/by_email`, payload)
      .pipe(map((data: any) => data["data"]));
  }

  getUserImage(user: UserModel) {
    var image = "abc";

    if (user.img) {
      image = user.img;
    }

    return this.http.get(`${environment.path}/images/${image}`);
  }

  updateUser(payload: any) {
    return this.http
      .put(`${environment.path}/users/${payload.user}`, payload)
      .pipe(map((data: any) => data.data));
  }

  updateObjectsState(objectType: string, operationType: string, object: any) {
    switch (objectType) {
      case "ticket":
        this.store.dispatch(updateTicketList({ payload: object }));
        this.store.dispatch(updateTicketSuccess({ payload: object }));
        break;
      case "organization":
        this.store.dispatch(updateOrganizationList({ organization: object }));
        this.store.dispatch(
          updateOrganizationSuccess({ organization: object })
        );
        break;
      case "area":
        console.log("veo la notificacion");
        this.store.dispatch(updateAreasList({ area: object }));
        this.store.dispatch(updateAreaSuccess({ payload: object }));
        break;
      case "member":
        if (operationType === "create") {
          console.log("create");
          this.store.dispatch(AddCreatedMemberToList({ member: object }));
        } else {
          console.log("update");
          this.store.dispatch(updateMemberList({ member: object }));
        }
        break;
    }
  }
}
