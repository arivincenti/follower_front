import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AreasService } from 'src/app/services/areas/areas.service';
import * as AreasActions from '../../actions/areas/areas.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AreasEffects
{

  constructor(
    private actions$: Actions,
    private _areasService: AreasService
  ) { }

  getOrganizationAreas$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.getOrganizationAreas),
    mergeMap((action) => this._areasService.getOrganizationAreas(action.payload).pipe(
      map((data: any) => AreasActions.getOrganizationAreasSuccess({ payload: data.data })),
      catchError(error => of(AreasActions.getOrganizationAreasFail({ payload: error.error }))
      ))
    ))
  );
}