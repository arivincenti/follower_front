import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import * as ticketsActions from "@actions/tickets";
import * as ticketActions from "@actions/ticket";
// import {
//   updateOrganizationList,
//   addCreatedOrganizationToList,
// } from "src/app/store/actions/userOrganizations/organizations/organizations.actions";
import * as organizationsActions from "src/app/store/actions/userOrganizations/organizations/organizations.actions";
import * as AreasActions from "src/app/store/actions/userOrganizations/organization/areas/areas.actions";
// import {
//   addCreatedMemberToList,
//   updateMemberList,
// } from "src/app/store/actions/userOrganizations/organization/members/members/members.actions";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { WebsocketService } from "../websocket/websocket.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private _wsService: WebsocketService
  ) {}

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
        if (operationType === "create") {
          // this._wsService.emit("join-ticket", object);
          this.store.dispatch(
            ticketsActions.addCreatedTicketToList({ ticket: object })
          );
        } else {
          this.store.dispatch(
            ticketsActions.updateTicketList({ ticket: object })
          );
          this.store.dispatch(
            ticketActions.updateTicketSuccess({ ticket: object })
          );
        }
        break;
      // case "organization":
      //   if (operationType === "create") {
      //     // this._wsService.emit("join-organization", object);
      //     this.store.dispatch(
      //       addCreatedOrganizationToList({ organization: object })
      //     );
      //   } else {
      //     this.store.dispatch(updateOrganizationList({ organization: object }));
      //     this.store.dispatch(
      //       updateOrganizationSuccess({ organization: object })
      //     );
      //   }
      //   break;
      // case "area":
      //   if (operationType === "create") {
      //     this.store.dispatch(addCreatedAreaToList({ area: object }));
      //   } else {
      //     this.store.dispatch(updateAreasList({ area: object }));
      //     this.store.dispatch(updateAreaSuccess({ payload: object }));
      //   }
      //   break;
      // case "member": //Organization member
      //   if (operationType === "create") {
      //     this.store.dispatch(addCreatedMemberToList({ member: object }));
      //   } else {
      //     this.store.dispatch(updateMemberList({ member: object }));
      //   }
      //   break;
    }
  }
}
