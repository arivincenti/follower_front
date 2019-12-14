import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as MembersActions from '../../../../actions/userOrganizations/selectedOrganization/members/members.actions';
import * as MemberActions from '../../../../actions/userOrganizations/selectedOrganization/members/member.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MembersService } from '../../../../../services/members/members.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class MemberEffects
{
  constructor(
    private actions$: Actions,
    private _membersService: MembersService
  ) { }

  updateMember$ = createEffect(() => this.actions$.pipe(
    ofType(MemberActions.updateMember),
    mergeMap((action) => this._membersService.updateMember(action.payload)
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
          return MemberActions.updateMemberSuccess({ payload: member })
        }),
        catchError(error => of(MemberActions.updateMemberFail({ payload: error.error })))
      ))
  ));

  clearOrganizationState$ = createEffect(() => this.actions$.pipe(
    ofType(MemberActions.clearSelectedMemberState)
  ), {dispatch: false});

}