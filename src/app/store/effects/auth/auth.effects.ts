import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { AuthService } from '../../../services/auth/auth.service';
import * as AuthActions from '../../actions/auth/auth.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class AuthEffects
{

  constructor(
    private actions$: Actions,
    private _authService: AuthService
  ) { }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    mergeMap(action => this._authService.login(action.credentials)
      .pipe(
        map((data: any) => AuthActions.loginSuccess({ user: data.data, token: data.token })),
        catchError(error =>
        {
          return of(AuthActions.loginFail({ payload: error.error }))
        })
      ))
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => this._authService.logout())
  ), { dispatch: false });

}