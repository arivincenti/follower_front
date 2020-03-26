import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import * as UserTicketsActions from "../../../../actions/userOrganizations/tickets/userTickets/userTickets.actions";
import { TicketsService } from "src/app/services/tickets/tickets.service";
import { MatSnackBar } from "@angular/material";
import { GenericNotificationComponent } from "src/app/shared/snackbar/generic-notification/generic-notification.component";

@Injectable()
export class UserTicketsEffects {
  constructor(
    private actions$: Actions,
    private _ticketsService: TicketsService,
    private _snackBar: MatSnackBar
  ) {}

  getTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserTicketsActions.getTickets),
      mergeMap(action =>
        this._ticketsService.getTickets(action.payload).pipe(
          map((data: any) =>
            UserTicketsActions.getTicketsSuccess({ payload: data.data })
          ),
          catchError(error =>
            of(UserTicketsActions.getTicketsFail(error.error))
          )
        )
      )
    )
  );

  createTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserTicketsActions.createTicket),
      mergeMap(action =>
        this._ticketsService.createTicket(action.payload).pipe(
          map((data: any) => {
            return UserTicketsActions.createTicketSuccess({
              payload: data.data
            });
          }),
          catchError(error =>
            of(UserTicketsActions.createTicketFail(error.error))
          )
        )
      )
    )
  );
}
