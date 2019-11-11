import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as OrganizationActions from '../../actions/organization/organization.actions';
import * as OrganizationsActions from '../../actions/organizations/organizations.actions';
import * as OrganizationAreasActions from '../../actions/organization/organizationAreas.actions';
import * as OrganizationUserAreasActions from '../../actions/organization/organizationUserAreas.actions';
import { mergeMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { of } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';

@Injectable()
export class OrganizationEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
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

  deleteOrganization$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.deleteOrganization),
    mergeMap((action) => this._organizationsService.deleteOrganization(action.organization)
      .pipe(
        map((data: any) => OrganizationActions.deleteOrganizationSuccess({ organization: data.data })),
        catchError(error => of(OrganizationActions.deleteOrganizationFail({ payload: error.error })))
      )
    )
  ));

  getOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.getOrganizationAreas),
    mergeMap((action) => this._organizationsService.getOrganizationAreas(action.organization)
      .pipe(
        map((areas: any) => OrganizationActions.getOrganizationAreasSuccess({ areas })),
        catchError(error => of(OrganizationActions.getOrganizationFail({payload: error})))
      ))
  ));

  getOrganizationUserAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.getOrganizationUserAreas),
    mergeMap((action) => this._organizationsService.getOrganizationUserAreas(action.user, action.organization)
      .pipe(
        map((userAreas: AreaModel[]) => OrganizationActions.getOrganizationUserAreasSuccess({ userAreas: userAreas })),
        catchError(error => of(OrganizationActions.getOrganizationFail({payload: error})))
      ))
  ));

}