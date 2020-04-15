import { createReducer, on, Action } from "@ngrx/store";
import * as TicketsActions from "../../../../actions/userOrganizations/tickets/tickets/tickets.actions";
import { TicketModel } from "src/app/models/ticketModel";

export interface TicketsState {
  tickets: TicketModel[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialTicketsState: TicketsState = {
  tickets: [],
  loading: false,
  loaded: false,
  error: null,
};

export const ticketsReducer = createReducer(
  initialTicketsState,
  on(TicketsActions.getTickets, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TicketsActions.getTicketsSuccess, (state, { payload }) => ({
    ...state,
    tickets: [...payload],
    loading: false,
    loaded: true,
  })),
  on(TicketsActions.getTicketsFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(TicketsActions.createTicket, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TicketsActions.createTicketSuccess, (state, { ticket }) => {
    var index = state.tickets.findIndex((data) => data._id === ticket._id);
    state.tickets.splice(index, 1, { ...ticket });
    return {
      ...state,
      tickets: [...state.tickets],
      loading: false,
      loaded: true,
    };
  }),
  on(TicketsActions.createTicketFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(TicketsActions.updateTicket, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TicketsActions.updateTicketSuccess, (state, { payload }) => {
    var index = state.tickets.findIndex((data) => data._id === payload._id);
    state.tickets.splice(index, 1, { ...payload });
    return {
      ...state,
      tickets: [...state.tickets],
      loading: false,
      loaded: true,
    };
  }),
  on(TicketsActions.updateTicketFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(TicketsActions.addCreatedTicketToList, (state, { ticket }) => ({
    ...state,
    tickets: [...state.tickets, { ...ticket }],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(TicketsActions.updateTicketList, (state, { payload }) => {
    var index = state.tickets.findIndex((data) => data._id === payload._id);
    state.tickets.splice(index, 1, { ...payload });
    return {
      ...state,
      tickets: [...state.tickets],
      loading: false,
      loaded: true,
    };
  })
);

export function TicketsReducer(
  state: TicketsState | undefined,
  action: Action
) {
  return ticketsReducer(state, action);
}
