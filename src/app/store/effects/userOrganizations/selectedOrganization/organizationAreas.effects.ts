import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { OrganizationsService } from '../../../../services/organizations/organizations.service';
import { of } from 'rxjs';
import { AreasService } from '../../../../services/areas/areas.service';
import * as OrganizationAreasActions from '../../../actions/userOrganizations/selectedOrganization/organizationAreas.actions';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable()
export class OrganizationAreasEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService,
    private _areaService: AreasService,
    private router: Router
  ) { }


  getOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationAreasActions.getOrganizationAreas),
    mergeMap((action) => this._organizationsService.getOrganizationAreas(action.payload)
      .pipe(
        map((areas: any) => OrganizationAreasActions.getOrganizationAreasSuccess({ payload: areas })),
        catchError(error => of(OrganizationAreasActions.getOrganizationAreasFail({ payload: error })))
      ))
  ));

  createOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationAreasActions.createOrganizationArea),
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
            timer: 2700
          });
          OrganizationAreasActions.createOrganizationAreaSuccess({ payload: area });
          this.router.navigate(['app/organizations/profile', action.payload.organization]);
        }),
        catchError(error => of(OrganizationAreasActions.createOrganizationAreaFail({ payload: error })))
      ))
  ), {dispatch: false});

  updateOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationAreasActions.updateOrganizationArea),
    mergeMap((action) => this._areaService.updateArea(action.areaId, action.payload)
      .pipe(
        map((area: any) =>
        {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Genial!!',
            text: 'El área se modificó con éxito',
            showConfirmButton: false,
            timer: 2700
          });
          return OrganizationAreasActions.updateOrganizationAreaSuccess({ payload: area })
        }),
        catchError(error => of(OrganizationAreasActions.updateOrganizationAreaFail({ payload: error })))
      ))
  ));

  deleteOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationAreasActions.deleteOrganizationArea),
    mergeMap((action) => this._areaService.deleteArea(action.payload)
      .pipe(
        map((area: any) =>
        {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Genial!!',
            text: 'El área se dio de baja con éxito',
            showConfirmButton: false,
            timer: 2700
          });
          return OrganizationAreasActions.deleteOrganizationAreaSuccess({ payload: area })
        }),
        catchError(error => of(OrganizationAreasActions.deleteOrganizationAreaFail({ payload: error })))
      ))
  ));


  // clearSelectedOrganizationState$ = createEffect(() => this.actions$.pipe(
  //   ofType(OrganizationActions.clearSelectedOrganizationState)
  // ), { dispatch: false });


}