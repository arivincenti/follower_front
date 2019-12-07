import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { OrganizationsService } from '../../../../services/organizations/organizations.service';
import { of } from 'rxjs';
import { AreaModel } from '../../../../models/area.model';
import * as UserAreasActions from '../../../actions/userOrganizations/selectedOrganization/areas/userAreas.actions';


@Injectable()
export class OrganizationUserAreasEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
  ) { }


  getOrganizationUserAreas$ = createEffect(() => this.actions$.pipe(
    ofType(UserAreasActions.getUserAreas),
    mergeMap((action) => this._organizationsService.getOrganizationUserAreas(action.user, action.organization)
      .pipe(
        map((userAreas: AreaModel[]) => UserAreasActions.getUserAreasSuccess({ payload: userAreas })),
        catchError(error => of(UserAreasActions.getUserAreasFail({ payload: error })))
      ))
  ));

  // clearSelectedOrganizationState$ = createEffect(() => this.actions$.pipe(
  //   ofType(OrganizationActions.clearSelectedOrganizationState)
  // ), { dispatch: false });


}