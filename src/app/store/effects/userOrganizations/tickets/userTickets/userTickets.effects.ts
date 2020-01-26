import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserTicketsActions from '../../../../actions/userOrganizations/tickets/userTickets/userTickets.actions';
import * as AreaTicketsActions from '../../../../actions/userOrganizations/tickets/areaTickets/areaTickets.actions';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class UserTicketsEffects
{
  constructor(
    private actions$: Actions,
    private _ticketsService: TicketsService,
    private store: Store<AppState>
  ) { }

  getTickets$ = createEffect(() => this.actions$.pipe(
    ofType(UserTicketsActions.getTickets),
    mergeMap(action => this._ticketsService.getTickets(action.payload)
      .pipe(
        map((data: any) => UserTicketsActions.getTicketsSuccess({ payload: data.data })),
        catchError(error => of(UserTicketsActions.getTicketsFail(error.error))
        ))
    )));

  createTicket$ = createEffect(() => this.actions$.pipe(
    ofType(UserTicketsActions.createTicket),
    mergeMap(action => this._ticketsService.createTicket(action.payload)
      .pipe(
        map((data: any) =>
        {
          return UserTicketsActions.createTicketSuccess({ payload: data.data })
        }),
        catchError(error => of(UserTicketsActions.createTicketFail(error.error))
        ))
    )));


}