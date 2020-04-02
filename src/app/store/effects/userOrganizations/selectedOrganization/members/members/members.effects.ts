import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as MembersActions from "../../../../../actions/userOrganizations/selectedOrganization/members/members/members.actions";
import * as AreasActions from "../../../../../actions/userOrganizations/selectedOrganization/areas/areas/areas.actions";
import { mergeMap, map, catchError } from "rxjs/operators";
import { MembersService } from "src/app/services/members/members.service";
import { of } from "rxjs";
import Swal from "sweetalert2";
import { AppState } from "src/app/store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable()
export class MembersEffects {
  constructor(
    private actions$: Actions,
    private _membersService: MembersService
  ) {}

  getMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersActions.getMembers),
      mergeMap(action =>
        this._membersService.getMembers(action.payload).pipe(
          map((members: any) =>
            MembersActions.getMembersSuccess({ payload: members })
          ),
          catchError(error =>
            of(MembersActions.getMembersFail({ payload: error }))
          )
        )
      )
    )
  );
}
