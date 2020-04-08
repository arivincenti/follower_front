import { Injectable } from "@angular/core";
import { TicketsService } from "src/app/services/tickets/tickets.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as TicketActions from "../../../../../actions/userOrganizations/tickets/ticket/ticket/ticket.actions";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class TicketEffects {
  constructor(
    private _ticketsService: TicketsService,
    private actions$: Actions,
    private _snackBar: MatSnackBar
  ) {}

  getTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.getTicket),
      mergeMap((action) =>
        this._ticketsService.getTicket(action.payload).pipe(
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

  createTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.createTicket),
      mergeMap((action) =>
        this._ticketsService.createTicket(action.payload).pipe(
          map((data: any) =>
            TicketActions.createTicketSuccess({
              ticket: data.data,
            })
          ),
          catchError((error) => of(TicketActions.createTicketFail(error.error)))
        )
      )
    )
  );

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.updateTicket),
      mergeMap((action) =>
        this._ticketsService.updateTicket(action.payload).pipe(
          map((data: any) =>
            TicketActions.updateTicketSuccess({ payload: data.data })
          ),
          catchError((error) =>
            of(TicketActions.updateTicketFail({ payload: error.error }))
          )
        )
      )
    )
  );
}
