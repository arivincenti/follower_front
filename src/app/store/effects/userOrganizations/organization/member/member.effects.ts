import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as MemberActions from "@actions/member";
import * as MembersActions from "@actions/members";
import { MembersService } from "src/app/services/members/members.service";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
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
      switchMap((action) =>
        this._membersService.getMember(action.payload).pipe(
          map((member) => MemberActions.getMemberSuccess({ member })),
          catchError((error) =>
            of(MemberActions.getMemberFail({ payload: error.error }))
          )
        )
      )
    )
  );

  createMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.createMember),
      switchMap((action) =>
        this._membersService.createMember(action.payload).pipe(
          mergeMap((member: any) => [
            MemberActions.createMemberSuccess({ member }),
            MembersActions.addCreatedMemberToList({ member }),
          ]),
          catchError((error) =>
            of(MemberActions.createMemberFail({ payload: error.error }))
          )
        )
      )
    )
  );

  activateMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.activateMember),
      switchMap((action) =>
        this._membersService.activateMember(action.payload).pipe(
          mergeMap((member: any) => [
            MemberActions.activateMemberSuccess({ member }),
            MembersActions.updateMemberList({ member }),
          ]),
          catchError((error) =>
            of(MemberActions.activateMemberFail({ payload: error.error }))
          )
        )
      )
    )
  );

  desactivateMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.desactivateMember),
      switchMap((action) =>
        this._membersService.desactivateMember(action.payload).pipe(
          mergeMap((member: any) => [
            MemberActions.desactivateMemberSuccess({ member }),
            MembersActions.updateMemberList({ member }),
          ]),
          catchError((error) =>
            of(MemberActions.desactivateMemberFail({ payload: error.error }))
          )
        )
      )
    )
  );
}
