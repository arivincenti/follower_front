import { createAction, props } from '@ngrx/store';
import { TicketModel } from '../../../../../models/ticketModel';

export const getTicket = createAction('[Ticket Actions] Get Ticket', props<{ payload: string }>());

export const getTicketSuccess = createAction('[Ticket Actions] Get Ticket Success', props<{ payload: TicketModel }>());

export const getTicketFail = createAction('[Ticket Actions] Get Ticket Fail', props<{ payload: any }>());
