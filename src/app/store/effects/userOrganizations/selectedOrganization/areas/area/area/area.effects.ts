import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AreasService } from '../../../../../../../services/areas/areas.service';
import * as AreaActions from '../../../../../../actions/userOrganizations/selectedOrganization/areas/area/area/area.actions';

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

}