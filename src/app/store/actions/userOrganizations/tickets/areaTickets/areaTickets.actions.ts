import { createAction, props } from '@ngrx/store';
import { TicketModel } from '../../../../../models/ticketModel';
import { AreaModel } from '../../../../../models/area.model';


export const getTickets = createAction(
  '[Area Tickets Actions] Get Tickets',
  props<{ payload: AreaModel }>()
);

export const getTicketsSuccess = createAction(
  '[Area Tickets Actions] Get Tickets Success',
  props<{ payload: TicketModel[] }>()
);

export const getTicketsFail = createAction(
  '[Area Tickets Actions] Get Tickets Fail',
  props<{ payload: any }>()
);