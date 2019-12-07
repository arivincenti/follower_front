import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as MembersActions from '../../../../actions/userOrganizations/selectedOrganization/members/members.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MembersService } from 'src/app/services/members/members.service';
import { of } from 'rxjs';

@Injectable()
export class MembersEffects
{
  constructor(
    private actions$: Actions,
    private _membersService: MembersService
  ) { }

  getMembers$ = createEffect(() => this.actions$.pipe(
    ofType(MembersActions.getMembers),
    mergeMap((action) => this._membersService.getMembers(action.payload)
      .pipe(
        map((members: any) => MembersActions.getMembersSuccess({ payload: members })),
        catchError(error => of(MembersActions.getMembersFail({payload: error})))
      ))
  ));

  createMember$ = createEffect(() => this.actions$.pipe(
    ofType(MembersActions.createMember),
    mergeMap((action) => this._membersService.createMember(action.payload)
      .pipe(
        map((member: any) => MembersActions.createMemberSuccess({ payload: member })),
        catchError(error => of(MembersActions.createMemberFail({payload: error})))
      ))
  ));

}

