import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as OrganizationsActions from '../../actions/organizations/organizations.actions';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { of } from 'rxjs';
import { MemberModel } from 'src/app/models/member.model';

@Injectable()
export class OrganizationsEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
  ) { }

  getOrganizations$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.getOrganizations),
    mergeMap(action => this._organizationsService.getUserOrganizations(action.payload)
      .pipe(
        map((data: any) => OrganizationsActions.getOrganizationsSuccess({ payload: data.data })),
        catchError(error => of(OrganizationsActions.getOrganizationsFail(error.error))
        ))
    )));

  getOrganization$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.getOrganization),
    mergeMap((action) => this._organizationsService.getOrganization(action.payload)
      .pipe(
        map((organization: any) => OrganizationsActions.getOrganizationSuccess({ payload: organization })),
        catchError(error => of(OrganizationsActions.getOrganizationFail(error.error)))
      ))
  ));

  getOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.getOrganizationAreas),
    mergeMap((action) => this._organizationsService.getOrganizationAreas(action.organization)
      .pipe(
        map((areas: any) => OrganizationsActions.getOrganizationAreasSuccess({ areas })),
        catchError(error => of(OrganizationsActions.getOrganizationAreasFail(error.error)))
      ))
  ));

  getOrganizationUserAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationsActions.getOrganizationUserAreaMember),
    mergeMap((action) => this._organizationsService.getOrganizationUserAreasMember(action.user, action.organization)
      .pipe(
        map((memberAreas: MemberModel[]) => OrganizationsActions.getOrganizationUserAreaMemberSuccess({ memberAreas })),
        catchError(error => of(OrganizationsActions.getOrganizationUserAreaMemberFail(error.error)))
      ))
  ));


}