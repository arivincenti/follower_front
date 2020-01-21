import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AreasService } from '../../../../../../../services/areas/areas.service';
import * as AreaMembersActions from '../../../../../../actions/userOrganizations/selectedOrganization/areas/area/areaMembers/areaMembers.actions';

@Injectable()
export class AreaMembersEffects
{
  constructor(
    private actions$: Actions,
    private _areasService: AreasService
  ) { }


  getAreaMembers$ = createEffect(() => this.actions$.pipe(
    ofType(AreaMembersActions.getAreaMembers),
    mergeMap((action) => this._areasService.getAreaMembers(action.payload)
      .pipe(
        map((areas: any) => AreaMembersActions.getAreaMembersSuccess({ payload: areas })),
        catchError(error => of(AreaMembersActions.getAreaMembersFail({ payload: error })))
      ))
  ));

  // createAreaMembers$ = createEffect(() => this.actions$.pipe(
  //   ofType(AreaMembersActions.createAreaMembers),
  //   mergeMap((action) => this._areasService.createAreaMembers(action.payload)
  //     .pipe(
  //       map((member: any) => AreaMembersActions.createAreaMembersSuccess({ payload: members })),
  //       catchError(error => of(AreaMembersActions.createAreaMembersFail({ payload: error })))
  //     ))
  // ));

}