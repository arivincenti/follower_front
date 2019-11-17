import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as AreasActions from '../../actions/areas/areas.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AreasService } from 'src/app/services/areas/areas.service';
import { of } from 'rxjs';

@Injectable()
export class AreasEffects
{
  constructor(
    private actions$: Actions,
    private areasService: AreasService
  ) { }


  getSelectedArea$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.getArea),
    mergeMap((action) => this.areasService.getselectedArea(action.payload).pipe(
      map((areas) => AreasActions.getAreaSuccess({ payload: areas })),
      catchError(error => of(AreasActions.getAreaFail({ payload: error.error })))
    ))
  ));

  getSelectedAreaMembers$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.getAreaMembers),
    mergeMap((action) => this.areasService.getAreaMembers(action.payload).pipe(
      map((areas) => AreasActions.getAreaMembersSuccess({ payload: areas })),
      catchError(error => of(AreasActions.getAreaMembersFail({ payload: error.error })))
    ))
  ));


}