import { Injectable } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { WebsocketService } from "../websocket/websocket.service";
import { MemberModel } from "src/app/models/member.model";
import { map } from "rxjs/operators";
import { TicketModel } from "src/app/models/ticketModel";

@Injectable({
  providedIn: "root",
})
export class TicketsService {
  constructor(private http: HttpClient, private wsService: WebsocketService) {}

  // ==================================================
  // get tickets
  // ==================================================
  getTickets(user: UserModel) {
    return this.http
      .get(`${environment.path}/tickets/user/${user._id}`)
      .pipe(map((data) => data["data"]));
  }

  // ==================================================
  // get ticket
  // ==================================================
  getTicket(ticket: string) {
    return this.http
      .get(`${environment.path}/tickets/${ticket}`)
      .pipe(map((data) => data["data"]));
  }

  // ==================================================
  // create a new ticket
  // ==================================================
  createTicket(ticket: any) {
    return this.http
      .post(`${environment.path}/tickets`, ticket)
      .pipe(map((data) => data["data"]));
  }

  // ==================================================
  // Update ticket properties
  // ==================================================
  updateTicket(payload: any) {
    return this.http
      .put(`${environment.path}/tickets/${payload.ticket._id}`, payload)
      .pipe(map((data) => data["data"]));
  }

  // ==================================================
  // Get responsible member tickets
  // ==================================================
  getMemberResponsibleTickets(member: MemberModel) {
    return this.http
      .get(`${environment.path}/tickets/responsible/${member._id}`)
      .pipe(map((data) => data["data"]));
  }

  // ==================================================
  // Can edit
  // ==================================================
  canEdit(ticket: TicketModel, user: UserModel) {
    const member = ticket.area.members.find(
      (member) => member.user._id === user._id
    );

    if (
      // Si soy el creador del ticket y pertenezco al area puedo editar
      member !== undefined &&
      ticket.created_by._id === user._id
    ) {
      return false;
    } else if (
      // Si soy el creador del ticket y NO pertenezco al area NO puedo editar
      member === undefined &&
      ticket.created_by._id === user._id
    ) {
      console.log("entro al segundo");
      return true;
    } else if (
      // Si NO soy el creador del ticket pero pertenezco al area puedo editar
      member !== undefined &&
      ticket.created_by._id !== user._id
    ) {
      return false;
    }
  }
}
