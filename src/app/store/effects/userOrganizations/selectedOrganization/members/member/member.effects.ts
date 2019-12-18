import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as MemberActions from '../../../../../actions/userOrganizations/selectedOrganization/members/member/member.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MembersService } from '../../../../../../services/members/members.service';
import { of } from 'rxjs';

@Injectable()
export class MemberEffects
{
  constructor(
    private actions$: Actions,
    private _membersService: MembersService
  ) { }

  getMember$ = createEffect(() => this.actions$.pipe(
    ofType(MemberActions.getMember),
    mergeMap((action) => this._membersService.getMember(action.payload)
      .pipe(
        map((members: any) => MemberActions.getMemberSuccess({ payload: members })),
        catchError(error => of(MemberActions.getMemberFail({ payload: error })))
      ))
  ));

  clearOrganizationState$ = createEffect(() => this.actions$.pipe(
    ofType(MemberActions.clearSelectedMemberState)
  ), { dispatch: false });

}