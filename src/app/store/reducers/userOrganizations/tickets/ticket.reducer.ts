import { combineReducers } from '@ngrx/store';
import * as UserTicketReducer from './userTickets/userTickets.reducer';
import * as AreaTicketReducer from './areaTickets/areaTickets.reducer';
import * as SelectedTicketReducer from './ticket/ticket.reducer';

export interface state {
	userTickets: UserTicketReducer.UserTicketsState;
	areaTickets: AreaTicketReducer.AreaTicketsState;
	selectedTicket: SelectedTicketReducer.TicketState;
}

export const initialState: state = {
	userTickets: UserTicketReducer.initialUserTicketsState,
	areaTickets: AreaTicketReducer.initialAreaTicketsState,
	selectedTicket: SelectedTicketReducer.initialTicketState
};

export const TicketReducer = combineReducers(
	{
		userTickets: UserTicketReducer.UserTicketsReducer,
		areaTickets: AreaTicketReducer.AreaTicketsReducer,
		selectedTicket: SelectedTicketReducer.TicketReducer
	},
	initialState
);
