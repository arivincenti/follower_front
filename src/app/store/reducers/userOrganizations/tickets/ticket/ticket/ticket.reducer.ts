import { createReducer, on, Action } from "@ngrx/store";
import * as TicketActions from "../../../../../actions/userOrganizations/tickets/ticket/ticket/ticket.actions";
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
  error: null,
};

export const ticketReducer = createReducer(
  initialTicketState,
  on(TicketActions.getTicket, (state) => ({
    ...state,
    ticket: null,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TicketActions.getTicketSuccess, (state, { payload }) => ({
    ...state,
    ticket: { ...payload },
    loading: false,
    loaded: true,
  })),
  on(TicketActions.getTicketFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(TicketActions.createTicket, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TicketActions.createTicketSuccess, (state, { ticket }) => ({
    ...state,
    ticket: { ...ticket },
    loading: false,
    loaded: true,
  })),
  on(TicketActions.createTicketFail, (state, { payload }) => ({
    ...state,
    ticket: { ...state.ticket },
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(TicketActions.updateTicket, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TicketActions.updateTicketSuccess, (state, { payload }) => ({
    ...state,
    ticket: { ...payload },
    loading: false,
    loaded: true,
  })),
  on(TicketActions.updateTicketFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function TicketReducer(state: TicketState | undefined, action: Action) {
  return ticketReducer(state, action);
}
