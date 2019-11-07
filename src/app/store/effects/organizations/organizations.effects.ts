import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as OrganizationsActions from '../../actions/organizations/organizations.actions';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { of } from 'rxjs';

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
}