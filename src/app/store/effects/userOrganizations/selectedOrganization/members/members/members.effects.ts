import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as MembersActions from '../../../../../actions/userOrganizations/selectedOrganization/members/members/members.actions';
import * as MemberActions from '../../../../../actions/userOrganizations/selectedOrganization/members/member/member.actions';
import * as MemberAreasActions from '../../../../../actions/userOrganizations/selectedOrganization/members/memberAreas/memberAreas.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MembersService } from 'src/app/services/members/members.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class MembersEffects
{
  constructor(
    private actions$: Actions,
    private _membersService: MembersService,
    private store: Store<AppState>
  ) { }

  getMembers$ = createEffect(() => this.actions$.pipe(
    ofType(MembersActions.getMembers),
    mergeMap((action) => this._membersService.getMembers(action.payload)
      .pipe(
        map((members: any) => MembersActions.getMembersSuccess({ payload: members })),
        catchError(error => of(MembersActions.getMembersFail({ payload: error })))
      ))
  ));

  createMember$ = createEffect(() => this.actions$.pipe(
    ofType(MembersActions.createMember),
    mergeMap((action) => this._membersService.createMember(action.payload)
      .pipe(
        map((member: any) =>
        {
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
        catchError(error => of(MembersActions.createMemberFail({ payload: error.error })))
      ))
  ));

  updateMember$ = createEffect(() => this.actions$.pipe(
    ofType(MembersActions.updateMember),
    mergeMap((action) => this._membersService.updateMember(action.payload)
      .pipe(
        map((member: any) =>
        {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Genial!!',
            text: `El miembro de la organización se modificó con éxito`,
            showConfirmButton: false,
            timer: 2500
          });
          this.store.dispatch(MemberActions.getMember({payload: member._id}));
          this.store.dispatch(MemberAreasActions.getMemberAreas({user: member.user._id, organization: member.organization._id}));
          return MembersActions.updateMemberSuccess({ payload: member });

        }),
        catchError(error => of(MembersActions.updateMemberFail({ payload: error.error })))
      )),
  ));

  inactiveMember$ = createEffect(() => this.actions$.pipe(
    ofType(MembersActions.inactiveMember),
    mergeMap((action) => this._membersService.inactiveMember(action.payload)
      .pipe(
        map((member: any) =>
        {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Genial!!',
            text: `El miembro de la organización se modificó con éxito`,
            showConfirmButton: false,
            timer: 2500
          });
          this.store.dispatch(MemberActions.getMember({payload: member._id}));
          return MembersActions.inactiveMemberSuccess({ payload: member })
        }),
        catchError(error => of(MembersActions.inactiveMemberFail({ payload: error.error })))
      ))
  ));

}

