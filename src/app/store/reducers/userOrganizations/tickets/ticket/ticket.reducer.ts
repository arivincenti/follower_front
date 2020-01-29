import { createReducer, on, Action } from "@ngrx/store";
import * as TicketsActions from "../../../../actions/userOrganizations/tickets/ticket/ticket.actions";
import { TicketModel } from "src/app/models/ticketModel";

export interface TicketState {
  ticket: TicketModel;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialTicketState: TicketState = {
  ticket: null,
  loading: false,
  loaded: false,
  error: null
};

export const ticketReducer = createReducer(
  initialTicketState,
  on(TicketsActions.getTicket, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(TicketsActions.getTicketSuccess, (state, { payload }) => ({
    ...state,
    ticket: { ...payload },
    loading: false,
    loaded: true
  })),
  on(TicketsActions.getTicketFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(TicketsActions.updateTicket, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(TicketsActions.updateTicketSuccess, (state, { payload }) => ({
    ...state,
    ticket: { ...payload },
    loading: false,
    loaded: true
  })),
  on(TicketsActions.updateTicketFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  }))
);

export function TicketReducer(state: TicketState | undefined, action: Action) {
  return ticketReducer(state, action);
}
