import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AreasService } from '../../../../../../services/areas/areas.service';
import * as AreasActions from '../../../../../actions/userOrganizations/selectedOrganization/areas/areas/areas.actions';
import * as AreaActions from '../../../../../actions/userOrganizations/selectedOrganization/areas/area/area/area.actions';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Injectable()
export class AreasEffects
{
  constructor(
    private actions$: Actions,
    private _areasService: AreasService,
    private store: Store<AppState>
  ) { }


  getAreas$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.getAreas),
    mergeMap((action) => this._areasService.getAreas(action.payload, action.since, action.size)
      .pipe(
        map((areas: any) => AreasActions.getAreasSuccess({ payload: areas })),
        catchError(error => of(AreasActions.getAreasFail({ payload: error })))
      ))
  ));

  createArea$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.createArea),
    mergeMap((action) => this._areasService.createArea(action.payload)
      .pipe(
        map((area: any) =>
        {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Genial!!',
            text: 'El área se creó con éxito',
            showConfirmButton: false,
            timer: 2700
          });
          return AreasActions.createAreaSuccess({ payload: area });
        }),
        catchError(error => of(AreasActions.createAreaFail({ payload: error })))
      ))
  ));

  updateArea$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.updateArea),
    mergeMap((action) => this._areasService.updateArea(action.areaId, action.payload)
      .pipe(
        map((area: any) =>
        {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: '¡Genial!',
            text: 'El área se modificó con éxito.',
            showConfirmButton: false,
            timer: 2700
          });
          this.store.dispatch(AreaActions.getArea({ payload: area._id }));
          return AreasActions.updateAreaSuccess({ payload: area })
        }),
        catchError(error => of(AreasActions.updateAreaFail({ payload: error })))
      ))
  ));

  deleteArea$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.deleteArea),
    mergeMap((action) => this._areasService.deleteArea(action.payload.area)
      .pipe(
        map((area: any) =>
        {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Genial!!',
            text: 'El área se modificó con éxito',
            showConfirmButton: false,
            timer: 2700
          });

          return AreasActions.deleteAreaSuccess({ payload: area })
        }),
        catchError(error => of(AreasActions.deleteAreaFail({ payload: error })))
      ))
  ));


  // clearSelectedOrganizationState$ = createEffect(() => this.actions$.pipe(
  //   ofType(OrganizationActions.clearSelectedOrganizationState)
  // ), { dispatch: false });


}