import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import * as TicketsActions from "../../../../actions/userOrganizations/tickets/tickets/tickets.actions";
import { TicketsService } from "src/app/services/tickets/tickets.service";
import { MatSnackBar } from "@angular/material";
import { TicketModel } from "src/app/models/ticketModel";

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
          map((tickets: TicketModel[]) =>
            TicketsActions.getTicketsSuccess({ tickets })
          ),
          catchError((error) => of(TicketsActions.getTicketsFail(error.error)))
        )
      )
    )
  );
}
