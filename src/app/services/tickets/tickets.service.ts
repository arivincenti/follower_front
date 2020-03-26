import { Injectable } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { WebsocketService } from "../websocket/websocket.service";
import { MemberModel } from "src/app/models/member.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TicketsService {
  constructor(private http: HttpClient, private wsService: WebsocketService) {}

  // ==================================================
  // get tickets
  // ==================================================
  getTickets(user: UserModel) {
    return this.http.get(`${environment.path}/tickets/user/${user._id}`);
  }

  // ==================================================
  // get ticket
  // ==================================================
  getTicket(ticket: string) {
    return this.http.get(`${environment.path}/tickets/${ticket}`);
  }

  // ==================================================
  // create a new ticket
  // ==================================================
  createTicket(ticket: any) {
    return this.http.post(`${environment.path}/tickets`, ticket);
  }

  // ==================================================
  // Update ticket properties
  // ==================================================
  updateTicket(payload: any) {
    return this.http.put(
      `${environment.path}/tickets/${payload.ticket}`,
      payload
    );
  }

  // ==================================================
  // Get responsible member tickets
  // ==================================================
  getMemberResponsibleTickets(member: MemberModel) {
    return this.http
      .get(`${environment.path}/tickets/responsible/${member._id}`)
      .pipe(map(data => data["data"]));
  }
}
