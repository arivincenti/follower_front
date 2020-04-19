import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { AreasService } from "../../../../../services/areas/areas.service";
import * as AreasActions from "@actions/areas";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";

@Injectable()
export class AreasEffects {
  constructor(
    private actions$: Actions,
    private _areasService: AreasService,
    private store: Store<AppState>
  ) {}

  getAreas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreasActions.getAreas),
      mergeMap((action) =>
        this._areasService
          .getAreas(action.payload, action.since, action.size)
          .pipe(
            map((areas: any) =>
              AreasActions.getAreasSuccess({ payload: areas })
            ),
            catchError((error) =>
              of(AreasActions.getAreasFail({ payload: error.error }))
            )
          )
      )
    )
  );
}
