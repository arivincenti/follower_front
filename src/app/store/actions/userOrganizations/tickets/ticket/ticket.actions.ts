import { createAction, props } from "@ngrx/store";
import { UserModel } from "src/app/models/user.model";
import { TicketModel } from "src/app/models/ticketModel";

export const getTicket = createAction(
  "[Ticket Actions] Get Tickets",
  props<{ payload: string }>()
);

export const getTicketSuccess = createAction(
  "[Ticket Actions] Get Tickets Success",
  props<{ ticket: TicketModel }>()
);

export const getTicketFail = createAction(
  "[Ticket Actions] Get Tickets Fail",
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
  "[Ticket Actions] Update Ticket",
  props<{ payload: any }>()
);

export const updateTicketSuccess = createAction(
  "[Ticket Actions] Update Ticket Success",
  props<{ ticket: TicketModel }>()
);

export const updateTicketFail = createAction(
  "[Ticket Actions] Update Ticket Fail",
  props<{ payload: any }>()
);

export const followTicket = createAction(
  "[Ticket Actions] Follow Ticket",
  props<{ payload: any }>()
);

export const followTicketSuccess = createAction(
  "[Ticket Actions] Follow Ticket Success",
  props<{ ticket: TicketModel }>()
);

export const followTicketFail = createAction(
  "[Ticket Actions] Follow Ticket Fail",
  props<{ payload: any }>()
);

export const unfollowTicket = createAction(
  "[Ticket Actions] Unfollow Ticket",
  props<{ payload: any }>()
);

export const unfollowTicketSuccess = createAction(
  "[Ticket Actions] Unfollow Ticket Success",
  props<{ ticket: TicketModel }>()
);

export const unfollowTicketFail = createAction(
  "[Ticket Actions] Unfollow Ticket Fail",
  props<{ payload: any }>()
);
