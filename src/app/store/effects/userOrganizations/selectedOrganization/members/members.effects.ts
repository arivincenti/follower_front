import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as MembersActions from '../../../../actions/userOrganizations/selectedOrganization/members/members.actions';
import * as MemberActions from '../../../../actions/userOrganizations/selectedOrganization/members/member.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MembersService } from 'src/app/services/members/members.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

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

  getMember$ = createEffect(() => this.actions$.pipe(
    ofType(MemberActions.getMember),
    mergeMap((action) => this._membersService.getMember(action.payload)
      .pipe(
        map((member: any) => MemberActions.getMemberSuccess({ payload: member })),
        catchError(error => of(MemberActions.getMemberFail({payload: error})))
      ))
  ));

  createMember$ = createEffect(() => this.actions$.pipe(
    ofType(MembersActions.createMember),
    mergeMap((action) => this._membersService.createMember(action.payload)
      .pipe(
        map((member: any) => {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Genial!!',
            text: 'El miembro de la organización se creó con éxito',
            showConfirmButton: false,
            timer: 2500
          });
          return MembersActions.createMemberSuccess({ payload: member })
        }),
        catchError(error => of(MembersActions.createMemberFail({payload: error.error})))
      ))
  ));

}

