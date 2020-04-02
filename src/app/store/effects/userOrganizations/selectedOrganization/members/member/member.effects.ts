import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as MemberActions from "../../../../../actions/userOrganizations/selectedOrganization/members/member/member.actions";
import { mergeMap, map, catchError } from "rxjs/operators";
import { MembersService } from "../../../../../../services/members/members.service";
import { of } from "rxjs";

@Injectable()
export class MemberEffects {
  constructor(
    private actions$: Actions,
    private _membersService: MembersService
  ) {}

  getMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.getMember),
      mergeMap(action =>
        this._membersService.getMember(action.payload).pipe(
          map((members: any) =>
            MemberActions.getMemberSuccess({ payload: members })
          ),
          catchError(error =>
            of(MemberActions.getMemberFail({ payload: error }))
          )
        )
      )
    )
  );

  createMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.createMember),
      mergeMap(action =>
        this._membersService.createMember(action.payload).pipe(
          map((member: any) => MemberActions.createMemberSuccess({ member })),
          catchError(error =>
            of(MemberActions.createMemberFail({ payload: error.error }))
          )
        )
      )
    )
  );

  activateMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.activateMember),
      mergeMap(action =>
        this._membersService.activateMember(action.payload).pipe(
          map((member: any) => MemberActions.activateMemberSuccess({ member })),
          catchError(error =>
            of(MemberActions.activateMemberFail({ payload: error.error }))
          )
        )
      )
    )
  );

  desactivateMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.desactivateMember),
      mergeMap(action =>
        this._membersService.desactivateMember(action.payload).pipe(
          map((member: any) =>
            MemberActions.desactivateMemberSuccess({ member })
          ),
          catchError(error =>
            of(MemberActions.desactivateMemberFail({ payload: error.error }))
          )
        )
      )
    )
  );

  clearOrganizationState$ = createEffect(
    () => this.actions$.pipe(ofType(MemberActions.clearSelectedMemberState)),
    { dispatch: false }
  );
}
