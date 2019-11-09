import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as OrganizationAreasActions from '../../actions/organization/organizationAreas.actions';
import { mergeMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { of } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';

@Injectable()
export class OrganizationAreasEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
  ) { }

  getOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationAreasActions.getOrganizationAreas),
    mergeMap((action) => this._organizationsService.getOrganizationAreas(action.organization)
      .pipe(
        map((areas: any) => OrganizationAreasActions.getOrganizationAreasSuccess({ areas })),
        catchError(error => of(OrganizationAreasActions.getOrganizationAreasFail(error.error)))
      ))
  ));

}