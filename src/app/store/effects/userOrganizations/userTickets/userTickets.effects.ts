import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TicketsActions from '../../../actions/userOrganizations/userTickets/userTickets.actions';
import Swal from 'sweetalert2'
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Injectable()
export class UserTicketsEffects
{
  constructor(
    private actions$: Actions,
    private _ticketsService: TicketsService
  ) { }

  getTickets$ = createEffect(() => this.actions$.pipe(
    ofType(TicketsActions.getTickets),
    mergeMap(action => this._ticketsService.getTickets(action.payload)
      .pipe(
        map((data: any) => TicketsActions.getTicketsSuccess({ payload: data.data })),
        catchError(error => of(TicketsActions.getTicketsFail(error.error))
        ))
    )));

  // createOrganization$ = createEffect(() => this.actions$.pipe(
  //   ofType(OrganizationsActions.createOrganization),
  //   mergeMap((action) => this._organizationsService.createOrganization(action.payload)
  //     .pipe(
  //       map((organization: OrganizationModel) =>
  //       {
  //         Swal.fire({
  //           position: 'top-end',
  //           toast: true,
  //           icon: 'success',
  //           title: 'Genial!!',
  //           text: 'La organización se creó con éxito',
  //           showConfirmButton: false,
  //           timer: 2500
  //         });
  //         return OrganizationsActions.createOrganizationSuccess({ organization: organization })
  //       }),
  //       catchError(error => of(OrganizationsActions.createOrganizationFail({ payload: error.error })))
  //     )
  //   )
  // ));

  // updateOrganization$ = createEffect(() => this.actions$.pipe(
  //   ofType(OrganizationsActions.updateOrganization),
  //   mergeMap((action) => this._organizationsService.updateOrganization(action.organizationId, action.payload)
  //     .pipe(
  //       map((organization: OrganizationModel) =>
  //       {
  //         Swal.fire({
  //           position: 'top-end',
  //           toast: true,
  //           icon: 'success',
  //           title: 'Genial!!',
  //           text: 'La organización se actualizó con éxito',
  //           showConfirmButton: false,
  //           timer: 2500
  //         });
  //         return OrganizationsActions.updateOrganizationSuccess({ organization: organization })
  //       }),
  //       catchError(error => of(OrganizationsActions.updateOrganizationFail({ payload: error.error })))
  //     )
  //   )
  // ));

  // deleteOrganization$ = createEffect(() => this.actions$.pipe(
  //   ofType(OrganizationsActions.deleteOrganization),
  //   mergeMap((action) => this._organizationsService.deleteOrganization(action.organization)
  //     .pipe(
  //       map((organization: OrganizationModel) =>
  //       {
  //         Swal.fire({
  //           position: 'top-end',
  //           toast: true,
  //           icon: 'success',
  //           title: 'Genial!!',
  //           text: 'La organización se dio de baja con éxito',
  //           showConfirmButton: false,
  //           timer: 2500
  //         });
  //         return OrganizationsActions.deleteOrganizationSuccess({ organization: organization })
  //       }),
  //       catchError(error => of(OrganizationsActions.deleteOrganizationFail({ payload: error.error })))
  //     )
  //   )
  // ));

  // clearOrganizationState$ = createEffect(() => this.actions$.pipe(
  //   ofType(OrganizationsActions.clearState)
  // ), { dispatch: false });

}