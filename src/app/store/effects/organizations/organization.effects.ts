import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { OrganizationsService } from '../../../services/organizations/organizations.service';
import { of } from 'rxjs';
import * as OrganizationActions from '../../actions/organizations/organization.actions';

@Injectable()
export class OrganizationEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
  ) { }

  getOrganization$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.getOrganization),
    mergeMap((action) => this._organizationsService.getOrganization(action.payload)
      .pipe(
        map((organization: any) => OrganizationActions.getOrganizationSuccess({ payload: organization })),
        catchError(error => of(OrganizationActions.getOrganizationFail(error.error)))
      ))
  ));
}