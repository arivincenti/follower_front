import { Injectable } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as TicketActions from '../../../../actions/userOrganizations/tickets/ticket/ticket.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TicketEffects {
	constructor (private _ticketsService: TicketsService, private actions$: Actions) {}

	getTicket$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TicketActions.getTicket),
			mergeMap((action) =>
				this._ticketsService
					.getTicket(action.payload)
					.pipe(
						map((data: any) =>
							TicketActions.getTicketSuccess({ payload: data.data })
						),
						catchError((error) =>
							of(TicketActions.getTicketFail({ payload: error.error }))
						)
					)
			)
		)
	);
}
