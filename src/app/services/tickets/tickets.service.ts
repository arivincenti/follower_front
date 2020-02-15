import { Injectable } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { TicketModel } from "src/app/models/ticketModel";

@Injectable({
  providedIn: "root"
})
export class TicketsService {
  constructor(private http: HttpClient) {}

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
}
