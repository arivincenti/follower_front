import { createAction, props } from "@ngrx/store";
import { TicketModel } from "../../../../../../models/ticketModel";

export const getTicket = createAction(
  "[Ticket Actions] Get Ticket",
  props<{ payload: string }>()
);

export const getTicketSuccess = createAction(
  "[Ticket Actions] Get Ticket Success",
  props<{ payload: TicketModel }>()
);

export const getTicketFail = createAction(
  "[Ticket Actions] Get Ticket Fail",
  props<{ payload: any }>()
);

export const updateTicket = createAction(
  "[Ticket Actions] Update Ticket",
  props<{ payload: any }>()
);

export const updateTicketSuccess = createAction(
  "[Ticket Actions] Update Ticket Success",
  props<{ payload: TicketModel }>()
);

export const updateTicketFail = createAction(
  "[Ticket Actions] Update Ticket Fail",
  props<{ payload: any }>()
);
