import { createAction, props } from '@ngrx/store';
import { TicketModel } from '../../../../models/ticketModel';
import { UserModel } from 'src/app/models/user.model';

export const getTickets = createAction(
  '[User Tickets Actions] Get Tickets',
  props<{ payload: UserModel }>()
);

export const getTicketsSuccess = createAction(
  '[User Tickets Actions] Get Tickets Success',
  props<{ payload: TicketModel[] }>()
);

export const getTicketsFail = createAction(
  '[User Tickets Actions] Get Tickets Fail',
  props<{ payload: any }>()
);