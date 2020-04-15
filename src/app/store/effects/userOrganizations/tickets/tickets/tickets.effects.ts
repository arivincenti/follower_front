import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import * as TicketsActions from "../../../../actions/userOrganizations/tickets/tickets/tickets.actions";
import { TicketsService } from "src/app/services/tickets/tickets.service";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class TicketsEffects {
  constructor(
    private actions$: Actions,
    private _ticketsService: TicketsService,
    private _snackBar: MatSnackBar
  ) {}

  getTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.getTickets),
      mergeMap((action) =>
        this._ticketsService.getTickets(action.payload).pipe(
          map((data: any) =>
            TicketsActions.getTicketsSuccess({ payload: data.data })
          ),
          catchError((error) => of(TicketsActions.getTicketsFail(error.error)))
        )
      )
    )
  );

  createTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.createTicket),
      mergeMap((action) =>
        this._ticketsService.createTicket(action.payload).pipe(
          map((data: any) =>
            TicketsActions.createTicketSuccess({
              ticket: data.data,
            })
          ),
          catchError((error) =>
            of(TicketsActions.createTicketFail(error.error))
          )
        )
      )
    )
  );

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.updateTicket),
      mergeMap((action) =>
        this._ticketsService.updateTicket(action.payload).pipe(
          map((data: any) =>
            TicketsActions.updateTicketSuccess({ payload: data.data })
          ),
          catchError((error) =>
            of(TicketsActions.updateTicketFail({ payload: error.error }))
          )
        )
      )
    )
  );
}
