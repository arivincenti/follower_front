import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as OrganizationsActions from '../../actions/organizations/organizations.actions';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { of } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { AreaModel } from 'src/app/models/area.model';
import { AreasService } from 'src/app/services/areas/areas.service';
import Swal from 'sweetalert2'

@Injectable()
export class OrganizationsEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService,
    private _areaService: AreasService
  ) { }

  getUserOrganizations$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.getUserOrganizations),
    mergeMap(action => this._organizationsService.getUserOrganizations(action.payload)
      .pipe(
        map((data: any) => OrganizationsActions.getUserOrganizationsSuccess({ payload: data.data })),
        catchError(error => of(OrganizationsActions.getUserOrganizationsFail(error.error))
        ))
    )));

  getOrganization$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.getOrganization),
    mergeMap((action) => this._organizationsService.getOrganization(action.organization)
      .pipe(
        mergeMap((organization: any) => [
          OrganizationsActions.getOrganizationSuccess({ payload: organization }),
          OrganizationsActions.getOrganizationAreas({ organization: organization._id }),
          OrganizationsActions.getOrganizationUserAreas({ user: action.user, organization: organization._id })
        ]),
        catchError(error => of(OrganizationsActions.getOrganizationFail(error.error)))
      ))
  ));

  createOrganization$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.createOrganization),
    mergeMap((action) => this._organizationsService.createOrganization(action.payload)
      .pipe(
        map((organization: OrganizationModel) => {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Genial!!',
            text: 'La organización se creó con éxito',
            showConfirmButton: false,
            timer: 2500
          });
          return OrganizationsActions.createOrganizationSuccess({ organization: organization })
      }),
        catchError(error => of(OrganizationsActions.createOrganizationFail({ payload: error.error })))
      )
    )
  ));

  getOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.getOrganizationAreas),
    mergeMap((action) => this._organizationsService.getOrganizationAreas(action.organization)
      .pipe(
        map((areas: any) => OrganizationsActions.getOrganizationAreasSuccess({ areas })),
        catchError(error => of(OrganizationsActions.getOrganizationAreasFail({ payload: error })))
      ))
  ));

  createOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.createOrganizationArea),
    mergeMap((action) => this._areaService.createArea(action.payload)
      .pipe(
        map((area: any) =>
        {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Genial!!',
            text: 'El área se creó con éxito',
            showConfirmButton: false,
            timer: 2500
          });
          return OrganizationsActions.createOrganizationAreaSuccess({ area })
        }),
        catchError(error => of(OrganizationsActions.createOrganizationAreaFail({ payload: error })))
      ))
  ));

  getOrganizationUserAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.getOrganizationUserAreas),
    mergeMap((action) => this._organizationsService.getOrganizationUserAreas(action.user, action.organization)
      .pipe(
        map((userAreas: AreaModel[]) => OrganizationsActions.getOrganizationUserAreasSuccess({ userAreas: userAreas })),
        catchError(error => of(OrganizationsActions.getOrganizationUserAreasFail({ payload: error })))
      ))
  ));

  deleteOrganization$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.deleteOrganization),
    mergeMap((action) => this._organizationsService.deleteOrganization(action.organization)
      .pipe(
        map((data: any) => {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Genial!!',
            text: 'La organización se dio de baja con éxito',
            showConfirmButton: false,
            timer: 2500
          });
          return OrganizationsActions.deleteOrganizationSuccess({ organization: data.data })}),
        catchError(error => of(OrganizationsActions.deleteOrganizationFail({ payload: error.error })))
      )
    )
  ));

}