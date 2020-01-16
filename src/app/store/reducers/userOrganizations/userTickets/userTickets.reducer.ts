import { createReducer, on, Action } from '@ngrx/store';
import * as UserTicketsActions from '../../../actions/userOrganizations/userTickets/userTickets.actions';
import { TicketModel } from 'src/app/models/ticketModel';


export interface UserTicketsState
{
  tickets: TicketModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialUserTicketsState: UserTicketsState = {
  tickets: [],
  loading: false,
  loaded: false,
  error: null
}

export const userTicketsReducer = createReducer(
  initialUserTicketsState,
  on(UserTicketsActions.getTickets, (state) => (
    {
      ...state,
      tickets: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(UserTicketsActions.getTicketsSuccess, (state, { payload }) => (
    {
      ...state,
      tickets: [...payload],
      loading: false,
      loaded: true
    }
  )),
  on(UserTicketsActions.getTicketsFail, (state, { payload }) => (
    {
      ...state,
      tickets: [],
      loading: false,
      loaded: false,
      error: { payload }
    }
  )),
  // on(TicketsActions.createOrganization, (state) => (
  //   {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // )),
  // on(TicketsActions.createOrganizationSuccess, (state, { organization }) => (
  //   {
  //     ...state,
  //     organizations: [...state.organizations, { ...organization }],
  //     loading: false,
  //     loaded: true
  //   }
  // )),
  // on(TicketsActions.createOrganizationFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     loading: false,
  //     loaded: false,
  //     error: { ...payload }
  //   }
  // )),
  // on(TicketsActions.updateOrganization, (state) => (
  //   {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // )),
  // on(TicketsActions.updateOrganizationSuccess, (state, { organization }) =>
  // {
  //   var index = state.organizations.findIndex(data => data._id === organization._id);
  //   state.organizations.splice(index, 1, { ...organization });
  //   return {
  //     ...state,
  //     organizations: [...state.organizations],
  //     loading: false,
  //     loaded: true
  //   }
  // }),
  // on(TicketsActions.updateOrganizationFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     loading: false,
  //     loaded: false,
  //     error: { ...payload }
  //   }
  // )),
  // on(TicketsActions.deleteOrganization, (state) => (
  //   {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // )),
  // on(TicketsActions.deleteOrganizationSuccess, (state, { organization }) =>
  // {
  //   var index = state.organizations.findIndex(data => data._id === organization._id);
  //   state.organizations.splice(index, 1, { ...organization });
    
  //   return {
  //     ...state,
  //     organizations: [...state.organizations],
  //     loading: false,
  //     loaded: true
  //   }
  // }),
  // on(TicketsActions.deleteOrganizationFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     loading: false,
  //     loaded: false,
  //     error: { ...payload }
  //   }
  // )),
  // on(TicketsActions.clearState, (state) => (
  //   {
  //     ...state,
  //     ...initialOrganizationsState
  //   }
  // ))
);


export function UserTicketsReducer(state: UserTicketsState | undefined, action: Action)
{
  return userTicketsReducer(state, action);
}