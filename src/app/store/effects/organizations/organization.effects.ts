import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { OrganizationsService } from '../../../services/organizations/organizations.service';
import { of } from 'rxjs';
import { OrganizationModel } from '../../../models/organization.model';
import { AreaModel } from '../../../models/area.model';
import { AreasService } from '../../../services/areas/areas.service';
import * as OrganizationActions from '../../actions/organizations/organization.actions';
import Swal from 'sweetalert2'

@Injectable()
export class OrganizationEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService,
    private _areaService: AreasService
  ) { }


  getOrganization$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.getOrganization),
    mergeMap((action) => this._organizationsService.getOrganization(action.organization)
      .pipe(
        mergeMap((organization: any) => [
          OrganizationActions.getOrganizationSuccess({ payload: organization }),
          OrganizationActions.getOrganizationAreas({ organization: organization._id }),
          OrganizationActions.getOrganizationUserAreas({ user: action.user, organization: organization._id })
        ]),
        catchError(error => of(OrganizationActions.getOrganizationFail(error.error)))
      ))
  ));


  getOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.getOrganizationAreas),
    mergeMap((action) => this._organizationsService.getOrganizationAreas(action.organization)
      .pipe(
        map((areas: any) => OrganizationActions.getOrganizationAreasSuccess({ areas })),
        catchError(error => of(OrganizationActions.getOrganizationAreasFail({ payload: error })))
      ))
  ));

  createOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.createOrganizationArea),
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
          return OrganizationActions.createOrganizationAreaSuccess({ area })
        }),
        catchError(error => of(OrganizationActions.createOrganizationAreaFail({ payload: error })))
      ))
  ));

  getOrganizationUserAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.getOrganizationUserAreas),
    mergeMap((action) => this._organizationsService.getOrganizationUserAreas(action.user, action.organization)
      .pipe(
        map((userAreas: AreaModel[]) => OrganizationActions.getOrganizationUserAreasSuccess({ userAreas: userAreas })),
        catchError(error => of(OrganizationActions.getOrganizationUserAreasFail({ payload: error })))
      ))
  ));


}