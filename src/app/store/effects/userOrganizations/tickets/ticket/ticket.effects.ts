import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TicketsService } from "src/app/services/tickets/tickets.service";
import * as TicketActions from "@actions/ticket";
import * as TicketsActions from "@actions/tickets";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { TicketModel } from "src/app/models/ticketModel";

@Injectable()
export class TicketEffects {
  constructor(
    private actions$: Actions,
    private _ticketsService: TicketsService
  ) {}

  getTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.getTicket),
      switchMap((action) =>
        this._ticketsService.getTicket(action.payload).pipe(
          map((ticket: TicketModel) =>
            TicketActions.getTicketSuccess({ ticket })
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
      switchMap((action) =>
        this._ticketsService.createTicket(action.payload).pipe(
          mergeMap((ticket: TicketModel) => [
            TicketActions.createTicketSuccess({
              ticket,
            }),
            TicketsActions.addCreatedTicketToList({ ticket }),
          ]),
          catchError((error) =>
            of(TicketActions.createTicketFail({ payload: error.error }))
          )
        )
      )
    )
  );

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.updateTicket),
      switchMap((action) =>
        this._ticketsService.updateTicket(action.payload).pipe(
          mergeMap((ticket: TicketModel) => [
            TicketActions.updateTicketSuccess({ ticket }),
            TicketsActions.updateTicketList({ ticket }),
          ]),
          catchError((error) =>
            of(TicketActions.updateTicketFail({ payload: error.error }))
          )
        )
      )
    )
  );

  followTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.followTicket),
      switchMap((action) =>
        this._ticketsService.followTicket(action.payload).pipe(
          mergeMap((ticket: TicketModel) => [
            TicketActions.followTicketSuccess({ ticket }),
            TicketsActions.updateTicketList({ ticket }),
          ]),
          catchError((error) =>
            of(TicketActions.followTicketFail({ payload: error.error }))
          )
        )
      )
    )
  );

  unfollowTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.unfollowTicket),
      switchMap((action) =>
        this._ticketsService.unfollowTicket(action.payload).pipe(
          mergeMap((ticket: TicketModel) => [
            TicketActions.unfollowTicketSuccess({ ticket }),
            TicketsActions.updateTicketList({ ticket }),
          ]),
          catchError((error) =>
            of(TicketActions.unfollowTicketFail({ payload: error.error }))
          )
        )
      )
    )
  );
}
