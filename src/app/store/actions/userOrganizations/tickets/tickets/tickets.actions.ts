import { createAction, props } from "@ngrx/store";
import { TicketModel } from "../../../../../models/ticketModel";
import { UserModel } from "src/app/models/user.model";

export const getTickets = createAction(
  "[Tickets Actions] Get Tickets",
  props<{ payload: UserModel }>()
);

export const getTicketsSuccess = createAction(
  "[Tickets Actions] Get Tickets Success",
  props<{ payload: TicketModel[] }>()
);

export const getTicketsFail = createAction(
  "[Tickets Actions] Get Tickets Fail",
  props<{ payload: any }>()
);

export const createTicket = createAction(
  "[Ticket Actions] Create Ticket",
  props<{ payload: any }>()
);

export const createTicketSuccess = createAction(
  "[Ticket Actions] Create Ticket Success",
  props<{ ticket: TicketModel }>()
);

export const createTicketFail = createAction(
  "[Ticket Actions] Create Ticket Fail",
  props<{ payload: any }>()
);

export const updateTicket = createAction(
  "[Tickets Actions] Update Ticket",
  props<{ payload: any }>()
);

export const updateTicketSuccess = createAction(
  "[Tickets Actions] Update Ticket Success",
  props<{ payload: TicketModel }>()
);

export const updateTicketFail = createAction(
  "[Tickets Actions] Update Ticket Fail",
  props<{ payload: any }>()
);

export const addCreatedTicketToList = createAction(
  "[Tickets Actions] Add Created Ticket To List",
  props<{ ticket: TicketModel }>()
);

export const updateTicketList = createAction(
  "[Tickets Actions] Update Ticket list Success",
  props<{ payload: TicketModel }>()
);
