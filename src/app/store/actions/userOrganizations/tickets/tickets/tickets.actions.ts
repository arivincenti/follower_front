import { createAction, props } from "@ngrx/store";
import { TicketModel } from "../../../../../models/ticketModel";
import { UserModel } from "src/app/models/user.model";

export const getTickets = createAction(
  "[Tickets Actions] Get Tickets",
  props<{ payload: UserModel }>()
);

export const getTicketsSuccess = createAction(
  "[Tickets Actions] Get Tickets Success",
  props<{ tickets: TicketModel[] }>()
);

export const getTicketsFail = createAction(
  "[Tickets Actions] Get Tickets Fail",
  props<{ payload: any }>()
);

export const addCreatedTicketToList = createAction(
  "[Tickets Actions] Add Created Ticket To List",
  props<{ ticket: TicketModel }>()
);

export const updateTicketList = createAction(
  "[Tickets Actions] Update Ticket list Success",
  props<{ ticket: TicketModel }>()
);
