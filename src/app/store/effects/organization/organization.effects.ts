import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as OrganizationActions from '../../actions/organization/organization.actions';
import { mergeMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { of } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
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
    mergeMap((action) => this._organizationsService.getOrganization(action.payload)
      .pipe(
        map((organization: any) => OrganizationActions.getOrganizationSuccess({ payload: organization })),
        catchError(error => of(OrganizationActions.getOrganizationFail(error.error)))
      ))
  ));

  createOrganization$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.createOrganization),
    mergeMap((action) => this._organizationsService.createOrganization(action.payload)
      .pipe(
        map(() => this.router.navigate(['app/organizations'])),
        catchError(error => of(OrganizationActions.createOrganizationFail({ payload: error.error })))
      )
    )
  ), {dispatch: false});

}