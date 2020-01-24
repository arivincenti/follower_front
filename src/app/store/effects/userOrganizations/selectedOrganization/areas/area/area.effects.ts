import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AreasService } from '../../../../../../services/areas/areas.service';
import * as AreaActions from '../../../../../actions/userOrganizations/selectedOrganization/areas/area/area.actions';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AreaEffects
{
  constructor(
    private actions$: Actions,
    private _areasService: AreasService
  ) { }


  getArea$ = createEffect(() => this.actions$.pipe(
    ofType(AreaActions.getArea),
    mergeMap((action) => this._areasService.getArea(action.payload)
      .pipe(
        map((areas: any) => AreaActions.getAreaSuccess({ payload: areas })),
        catchError(error => of(AreaActions.getAreaFail({ payload: error })))
      ))
  ));

  createAreaMember$ = createEffect(() => this.actions$.pipe(
    ofType(AreaActions.createAreaMember),
    mergeMap((action) => this._areasService.addAreaMember(action.payload)
      .pipe(
        map((area: any) => {
          return AreaActions.createAreaMemberSuccess({ payload: area })
        }),
        catchError(error => of(AreaActions.createAreaMemberFail({ payload: error })))
      ))
  ));

}