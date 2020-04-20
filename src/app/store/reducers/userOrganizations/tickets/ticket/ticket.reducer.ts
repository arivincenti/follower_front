import { TicketModel } from "src/app/models/ticketModel";
import { createReducer, on, Action } from "@ngrx/store";
import * as TicketActions from "@actions/ticket";

export interface TicketState {
  ticket: TicketModel;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialStateTicket: TicketState = {
  ticket: null,
  loading: false,
  loaded: false,
  error: null,
};

export const ticketReducer = createReducer(
  initialStateTicket,
  on(TicketActions.getTicket, (state) => ({
    ticket: null,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TicketActions.getTicketSuccess, (state, { ticket }) => ({
    ticket: { ...ticket },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(TicketActions.getTicketFail, (state, { payload }) => ({
    ticket: { ...state.ticket },
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(TicketActions.createTicket, (state) => ({
    ticket: { ...state.ticket },
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TicketActions.createTicketSuccess, (state, { ticket }) => ({
    ticket: { ...ticket },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(TicketActions.createTicketFail, (state, { payload }) => ({
    ticket: { ...state.ticket },
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(TicketActions.updateTicket, (state) => ({
    ticket: { ...state.ticket },
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TicketActions.updateTicketSuccess, (state, { ticket }) => ({
    ticket: { ...ticket },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(TicketActions.updateTicketFail, (state, { payload }) => ({
    ticket: { ...state.ticket },
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function TicketReducer(state: TicketState | undefined, action: Action) {
  return ticketReducer(state, action);
}
