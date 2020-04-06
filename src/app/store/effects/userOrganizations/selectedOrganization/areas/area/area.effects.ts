import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { AreasService } from "../../../../../../services/areas/areas.service";
import * as AreaActions from "../../../../../actions/userOrganizations/selectedOrganization/areas/area/area.actions";
import { AreaModel } from "src/app/models/area.model";

@Injectable()
export class AreaEffects {
  constructor(private actions$: Actions, private _areasService: AreasService) {}

  getArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.getArea),
      mergeMap(action =>
        this._areasService.getArea(action.payload).pipe(
          map((area: AreaModel) =>
            AreaActions.getAreaSuccess({ payload: area })
          ),
          catchError(error => of(AreaActions.getAreaFail({ payload: error })))
        )
      )
    )
  );

  updateArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.updateArea),
      mergeMap(action =>
        this._areasService.updateArea(action.areaId, action.payload).pipe(
          map((area: any) => AreaActions.updateAreaSuccess({ payload: area })),
          catchError(error =>
            of(AreaActions.updateAreaFail({ payload: error }))
          )
        )
      )
    )
  );

  deleteArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.deleteArea),
      mergeMap(action =>
        this._areasService.deleteArea(action.payload.area).pipe(
          map((area: any) => AreaActions.deleteAreaSuccess({ payload: area })),
          catchError(error =>
            of(AreaActions.deleteAreaFail({ payload: error }))
          )
        )
      )
    )
  );

  createAreaMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.createAreaMember),
      mergeMap(action =>
        this._areasService.createAreaMember(action.payload).pipe(
          map((area: any) => {
            return AreaActions.createAreaMemberSuccess({ payload: area });
          }),
          catchError(error =>
            of(AreaActions.createAreaMemberFail({ payload: error }))
          )
        )
      )
    )
  );

  deleteAreaMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.deleteAreaMember),
      mergeMap(action =>
        this._areasService.deleteAreaMember(action.payload).pipe(
          map((area: any) => {
            return AreaActions.deleteAreaMemberSuccess({ payload: area });
          }),
          catchError(error =>
            of(AreaActions.deleteAreaMemberFail({ payload: error }))
          )
        )
      )
    )
  );

  setResponsibleAreaMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaActions.setResponsibleAreaMember),
      mergeMap(action =>
        this._areasService.setResponsibleAreaMember(action.payload).pipe(
          map((area: any) => {
            return AreaActions.setResponsibleAreaMemberSuccess({
              payload: area
            });
          }),
          catchError(error =>
            of(AreaActions.setResponsibleAreaMemberFail({ payload: error }))
          )
        )
      )
    )
  );

  clear$ = createEffect(() => this.actions$.pipe(ofType(AreaActions.clear)), {
    dispatch: false
  });
}
