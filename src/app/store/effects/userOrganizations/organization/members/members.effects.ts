import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as MembersActions from "@actions/members";
import { map, catchError, switchMap } from "rxjs/operators";
import { MembersService } from "src/app/services/members/members.service";
import { of } from "rxjs";

@Injectable()
export class MembersEffects {
  constructor(
    private actions$: Actions,
    private _membersService: MembersService
  ) {}

  getMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersActions.getMembers),
      switchMap((action) =>
        this._membersService.getMembers(action.payload).pipe(
          map((members: any) =>
            MembersActions.getMembersSuccess({ payload: members })
          ),
          catchError((error) =>
            of(MembersActions.getMembersFail({ payload: error }))
          )
        )
      )
    )
  );
}
