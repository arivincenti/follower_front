import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as UiActions from '../../actions/ui/ui.actions';
import { mergeMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UiEffects
{
  constructor(
    private actions$: Actions
  ) { }

  showOrganizationModal$ = createEffect(() => this.actions$.pipe(
    ofType(UiActions.showOrganizationModal),
    tap((action) => console.log('modal activado'))
  ), { dispatch: false });

  closeOrganizationModal$ = createEffect(() => this.actions$.pipe(
    ofType(UiActions.clearState),
    tap((action) => console.log('modal desactivado'))
  ), { dispatch: false });

}