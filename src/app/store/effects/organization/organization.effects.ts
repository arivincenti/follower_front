import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as OrganizationActions from '../../actions/organization/organization.actions';
import * as OrganizationAreasActions from '../../actions/organization/organizationAreas.actions';
import * as OrganizationUserAreasActions from '../../actions/organization/organizationUserAreas.actions';
import { mergeMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class OrganizationEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService,
    private router: Router
  ) { }

  getOrganization$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.getOrganization),
    mergeMap((action) => this._organizationsService.getOrganization(action.organization)
      .pipe(
        mergeMap((organization: any) => [OrganizationActions.getOrganizationSuccess({ payload: organization }),
        OrganizationAreasActions.getOrganizationAreas({ organization: organization._id }),
        OrganizationUserAreasActions.getOrganizationUserAreas({ user: action.user, organization: organization._id })
        ]),
        catchError(error => of(OrganizationActions.getOrganizationFail(error.error)))
      ))
  ));

}