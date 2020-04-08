import { createReducer, on, Action } from "@ngrx/store";
import * as UserTicketsActions from "../../../../actions/userOrganizations/tickets/userTickets/userTickets.actions";
import { TicketModel } from "src/app/models/ticketModel";

export interface UserTicketsState {
  tickets: TicketModel[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialUserTicketsState: UserTicketsState = {
  tickets: [],
  loading: false,
  loaded: false,
  error: null,
};

export const userTicketsReducer = createReducer(
  initialUserTicketsState,
  on(UserTicketsActions.getTickets, (state) => ({
    ...state,
    tickets: [],
    loading: true,
    loaded: false,
    error: null,
  })),
  on(UserTicketsActions.getTicketsSuccess, (state, { payload }) => ({
    ...state,
    tickets: [...payload],
    loading: false,
    loaded: true,
  })),
  on(UserTicketsActions.getTicketsFail, (state, { payload }) => ({
    ...state,
    tickets: [],
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(UserTicketsActions.addCreatedTicketToList, (state, { ticket }) => ({
    ...state,
    tickets: [...state.tickets, { ...ticket }],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(UserTicketsActions.updateTicketList, (state, { payload }) => {
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

export function UserTicketsReducer(
  state: UserTicketsState | undefined,
  action: Action
) {
  return userTicketsReducer(state, action);
}
