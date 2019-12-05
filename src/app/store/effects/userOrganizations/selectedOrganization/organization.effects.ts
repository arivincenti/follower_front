import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError } from 'rxjs/operators';
import { OrganizationsService } from '../../../../services/organizations/organizations.service';
import { of } from 'rxjs';
import * as OrganizationActions from '../../../actions/userOrganizations/selectedOrganization/organization.actions';
import * as OrganizationAreasActions from '../../../actions/userOrganizations/selectedOrganization/organizationAreas.actions';
import * as OrganizationUserAreasActions from '../../../actions/userOrganizations/selectedOrganization/organizationUserAreas.actions';

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
          OrganizationAreasActions.getOrganizationAreas({ payload: organization._id }),
          OrganizationUserAreasActions.getOrganizationUserAreas({ user: action.user, organization: organization._id })
        ]),
        catchError(error => of(OrganizationActions.getOrganizationFail(error.error)))
      ))
  ));


  clearSelectedOrganizationState$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.clearSelectedOrganizationState)
  ), { dispatch: false });


}