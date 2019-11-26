import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as AreasActions from '../../actions/areas/areas.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AreasService } from 'src/app/services/areas/areas.service';
import { of } from 'rxjs';
import { MembersService } from 'src/app/services/members/members.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class AreasEffects
{
  constructor(
    private actions$: Actions,
    private _areasService: AreasService,
    private _membersService: MembersService,
    private router: Router
  ) { }


  getSelectedArea$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.getArea),
    mergeMap((action) => this._areasService.getselectedArea(action.payload).pipe(
      map((areas) => AreasActions.getAreaSuccess({ payload: areas })),
      catchError(error => of(AreasActions.getAreaFail({ payload: error.error })))
    ))
  ));

  getSelectedAreaMembers$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.getAreaMembers),
    mergeMap((action) => this._areasService.getAreaMembers(action.payload).pipe(
      map((areas) => AreasActions.getAreaMembersSuccess({ payload: areas })),
      catchError(error => of(AreasActions.getAreaMembersFail({ payload: error.error })))
    ))
  ));

  createAreaMember$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.createAreaMember),
    mergeMap((action) => this._membersService.createMember(action.payload).pipe(
      map((member) => {
        AreasActions.createAreaMemberSuccess({ payload: member });

        Swal.fire({
          position: 'top-end',
          toast: true,
          icon: 'success',
          title: 'Genial!!',
          text: `El miembro "${member.user.name} ${member.user.last_name}" se creó con éxito`,
          showConfirmButton: false,
          timer: 2700
        });

        this.router.navigate(['app/organizations/areas/profile', action.payload.area]);
      }),
      catchError(error => of(AreasActions.createAreaMemberFail({ payload: error.error })))
    ))
  ), {dispatch: false});

  updateAreaMember$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.updateAreaMember),
    mergeMap((action) => this._membersService.updateMember(action.payload).pipe(
      map((member) => {

        Swal.fire({
          position: 'top-end',
          toast: true,
          icon: 'success',
          title: 'Genial!!',
          text: `El rol de "${member.user.name} ${member.user.last_name}" se modifió con éxito`,
          showConfirmButton: false,
          timer: 2700
        });
        
        return AreasActions.updateAreaMemberSuccess({ payload: member })
      }),
      catchError(error => of(AreasActions.updateAreaMemberFail({ payload: error.error })))
    ))
  ));

  clearSelectedAreaState$ = createEffect(() => this.actions$.pipe(
    ofType(AreasActions.clearSelectedAreaState)
  ), {dispatch: false});

}