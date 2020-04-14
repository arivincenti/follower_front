import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { AreasService } from "../../../../../services/areas/areas.service";
import * as AreasActions from "../../../../actions/userOrganizations/selectedOrganization/areas/areas.actions";
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
              of(AreasActions.getAreasFail({ payload: error }))
            )
          )
      )
    )
  );

  createArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreasActions.createArea),
      mergeMap((action) =>
        this._areasService.createArea(action.payload).pipe(
          map((area: any) => AreasActions.createAreaSuccess({ area })),
          catchError((error) =>
            of(AreasActions.createAreaFail({ payload: error }))
          )
        )
      )
    )
  );

  updateArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreasActions.updateArea),
      mergeMap((action) =>
        this._areasService.updateArea(action.areaId, action.payload).pipe(
          map((area: any) => AreasActions.updateAreaSuccess({ payload: area })),
          catchError((error) =>
            of(AreasActions.updateAreaFail({ payload: error }))
          )
        )
      )
    )
  );

  activateArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreasActions.activateArea),
      mergeMap((action) =>
        this._areasService.activateArea(action.areaId, action.payload).pipe(
          map((area: any) =>
            AreasActions.activateAreaSuccess({ payload: area })
          ),
          catchError((error) =>
            of(AreasActions.activateAreaFail({ payload: error }))
          )
        )
      )
    )
  );

  desactivateArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreasActions.desactivateArea),
      mergeMap((action) =>
        this._areasService.desactivateArea(action.areaId, action.payload).pipe(
          map((area: any) =>
            AreasActions.desactivateAreaSuccess({ payload: area })
          ),
          catchError((error) =>
            of(AreasActions.desactivateAreaFail({ payload: error }))
          )
        )
      )
    )
  );

  createAreaMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreasActions.createAreaMember),
      mergeMap((action) =>
        this._areasService.createAreaMember(action.payload).pipe(
          map((area: any) => {
            return AreasActions.createAreaMemberSuccess({ payload: area });
          }),
          catchError((error) =>
            of(AreasActions.createAreaMemberFail({ payload: error }))
          )
        )
      )
    )
  );

  deleteAreaMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreasActions.deleteAreaMember),
      mergeMap((action) =>
        this._areasService.deleteAreaMember(action.payload).pipe(
          map((area: any) => {
            return AreasActions.deleteAreaMemberSuccess({ payload: area });
          }),
          catchError((error) =>
            of(AreasActions.deleteAreaMemberFail({ payload: error }))
          )
        )
      )
    )
  );

  setResponsibleAreaMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreasActions.setResponsibleAreaMember),
      mergeMap((action) =>
        this._areasService.setResponsibleAreaMember(action.payload).pipe(
          map((area: any) => {
            return AreasActions.setResponsibleAreaMemberSuccess({
              payload: area,
            });
          }),
          catchError((error) =>
            of(AreasActions.setResponsibleAreaMemberFail({ payload: error }))
          )
        )
      )
    )
  );

  // clearSelectedOrganizationState$ = createEffect(() => this.actions$.pipe(
  //   ofType(OrganizationActions.clearSelectedOrganizationState)
  // ), { dispatch: false });
}
