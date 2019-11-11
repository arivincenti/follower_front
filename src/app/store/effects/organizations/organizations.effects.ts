import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as OrganizationsActions from '../../actions/organizations/organizations.actions';
import { mergeMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { of } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Router } from '@angular/router';
import { AreaModel } from 'src/app/models/area.model';

@Injectable()
export class OrganizationsEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
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
        map((organization: OrganizationModel) => OrganizationsActions.createOrganizationSuccess({ organization: organization })),
        catchError(error => of(OrganizationsActions.createOrganizationFail({ payload: error.error })))
      )
    )
  ));

  getOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.getOrganizationAreas),
    mergeMap((action) => this._organizationsService.getOrganizationAreas(action.organization)
      .pipe(
        map((areas: any) => OrganizationsActions.getOrganizationAreasSuccess({ areas })),
        catchError(error => of(OrganizationsActions.getOrganizationFail({payload: error})))
      ))
  ));

  getOrganizationUserAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.getOrganizationUserAreas),
    mergeMap((action) => this._organizationsService.getOrganizationUserAreas(action.user, action.organization)
      .pipe(
        map((userAreas: AreaModel[]) => OrganizationsActions.getOrganizationUserAreasSuccess({ userAreas: userAreas })),
        catchError(error => of(OrganizationsActions.getOrganizationFail({payload: error})))
      ))
  ));

  // deleteOrganization$ = createEffect(() => this.actions$.pipe(
  //   ofType(OrganizationsActions.deleteOrganization),
  //   mergeMap((action) => this._organizationsService.deleteOrganization(action.organization)
  //     .pipe(
  //       map((data: any) => OrganizationsActions.deleteOrganizationSuccess({ organization: data.data })),
  //       catchError(error => of(OrganizationsActions.createOrganizationFail({ payload: error.error })))
  //     )
  //   )
  // ));

}