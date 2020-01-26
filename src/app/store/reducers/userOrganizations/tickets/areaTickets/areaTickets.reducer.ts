import { createReducer, on, Action } from '@ngrx/store';
import * as AreaTicketsActions from '../../../../actions/userOrganizations/tickets/areaTickets/areaTickets.actions';
import { TicketModel } from 'src/app/models/ticketModel';


export interface AreaTicketsState
{
  tickets: TicketModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialAreaTicketsState: AreaTicketsState = {
  tickets: [],
  loading: false,
  loaded: false,
  error: null
}

export const areaTicketsReducer = createReducer(
  initialAreaTicketsState,
  on(AreaTicketsActions.getTickets, (state) => (
    {
      ...state,
      tickets: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(AreaTicketsActions.getTicketsSuccess, (state, { payload }) => (
    {
      ...state,
      tickets: [...payload],
      loading: false,
      loaded: true
    }
  )),
  on(AreaTicketsActions.getTicketsFail, (state, { payload }) => (
    {
      ...state,
      tickets: [],
      loading: false,
      loaded: false,
      error: { payload }
    }
  ))
);


export function AreaTicketsReducer(state: AreaTicketsState | undefined, action: Action)
{
  return areaTicketsReducer(state, action);
}