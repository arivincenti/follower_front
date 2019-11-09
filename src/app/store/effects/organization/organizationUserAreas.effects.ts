import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as OrganizationUserAreasActions from '../../actions/organization/organizationUserAreas.actions';
import { mergeMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { of } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';

@Injectable()
export class OrganizationUserAreasEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
  ) { }

  getOrganizationUserAreas$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationUserAreasActions.getOrganizationUserAreas),
    mergeMap((action) => this._organizationsService.getOrganizationUserAreas(action.user, action.organization)
      .pipe(
        map((userAreas: AreaModel[]) => OrganizationUserAreasActions.getOrganizationUserAreasSuccess({ userAreas: userAreas })),
        catchError(error => of(OrganizationUserAreasActions.getOrganizationUserAreasFail(error.error)))
      ))
  ));

}