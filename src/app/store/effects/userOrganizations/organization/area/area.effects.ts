import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AreasService } from "src/app/services/areas/areas.service";
import * as AreaActions from "@actions/area";
import * as AreasActions from "@actions/areas";
import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class AreaEffects {
  constructor(private actions$: Actions, private _areasService: AreasService) {}

  getArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.getArea),
      mergeMap((action) =>
        this._areasService.getArea(action.payload).pipe(
          map((area: any) => {
            return AreaActions.getAreaSuccess({ area });
          }),
          catchError((error) =>
            of(AreaActions.getAreaFail({ payload: error.error }))
          )
        )
      )
    )
  );

  createArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.createArea),
      mergeMap((action) =>
        this._areasService.createArea(action.payload).pipe(
          mergeMap((area: any) => [
            AreaActions.createAreaSuccess({ area }),
            AreasActions.addCreatedAreaToList({ area }),
          ]),
          catchError((error) =>
            of(AreaActions.createAreaFail({ payload: error }))
          )
        )
      )
    )
  );

  updateArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.updateArea),
      mergeMap((action) =>
        this._areasService.updateArea(action.areaId, action.payload).pipe(
          mergeMap((area: any) => [
            AreaActions.updateAreaSuccess({ area }),
            AreasActions.updateAreasList({ area }),
          ]),
          catchError((error) =>
            of(AreaActions.updateAreaFail({ payload: error.error }))
          )
        )
      )
    )
  );

  activateArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.activateArea),
      mergeMap((action) =>
        this._areasService.activateArea(action.areaId, action.payload).pipe(
          mergeMap((area: any) => [
            AreaActions.activateAreaSuccess({ area }),
            AreasActions.updateAreasList({ area }),
          ]),
          catchError((error) =>
            of(AreaActions.activateAreaFail({ payload: error.error }))
          )
        )
      )
    )
  );

  desactivateArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.desactivateArea),
      mergeMap((action) =>
        this._areasService.desactivateArea(action.areaId, action.payload).pipe(
          mergeMap((area: any) => [
            AreaActions.desactivateAreaSuccess({ area }),
            AreasActions.updateAreasList({ area }),
          ]),
          catchError((error) =>
            of(AreaActions.desactivateAreaFail({ payload: error.error }))
          )
        )
      )
    )
  );

  createAreaMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.createAreaMember),
      mergeMap((action) =>
        this._areasService.createAreaMember(action.payload).pipe(
          mergeMap((area: any) => [
            AreaActions.createAreaMemberSuccess({ area }),
            AreasActions.updateAreasList({ area }),
          ]),
          catchError((error) =>
            of(AreaActions.createAreaMemberFail({ payload: error.error }))
          )
        )
      )
    )
  );

  deleteAreaMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.deleteAreaMember),
      mergeMap((action) =>
        this._areasService.deleteAreaMember(action.payload).pipe(
          mergeMap((area: any) => [
            AreaActions.deleteAreaMemberSuccess({ area }),
            AreasActions.updateAreasList({ area }),
          ]),
          catchError((error) =>
            of(
              AreaActions.deleteAreaMemberFail({
                payload: error.error,
              })
            )
          )
        )
      )
    )
  );

  setResponsibleAreaMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.setResponsibleAreaMember),
      mergeMap((action) =>
        this._areasService.setResponsibleAreaMember(action.payload).pipe(
          mergeMap((area: any) => [
            AreaActions.setResponsibleAreaMemberSuccess({
              area,
            }),
            AreasActions.updateAreasList({ area }),
          ]),
          catchError((error) =>
            of(AreaActions.setResponsibleAreaMemberFail({ payload: error }))
          )
        )
      )
    )
  );
}
