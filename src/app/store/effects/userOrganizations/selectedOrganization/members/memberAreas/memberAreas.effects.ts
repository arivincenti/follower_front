

import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as MemberAreasActions from '../../../../../actions/userOrganizations/selectedOrganization/members/memberAreas/memberAreas.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MembersService } from '../../../../../../services/members/members.service';
import { of } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';

@Injectable()
export class MemberAreasEffects
{
  constructor(
    private actions$: Actions,
    private _membersService: MembersService
  ) { }


  //No se utiliza en ningun lado
  getMemberAreas$ = createEffect(() => this.actions$.pipe(
    ofType(MemberAreasActions.getMemberAreas),
    mergeMap((action) => this._membersService.getMemberAreas(action.user, action.organization)
      .pipe(
        map((memberAreas: AreaModel[]) => MemberAreasActions.getMemberAreasSuccess({ payload: memberAreas })),
        catchError(error => of(MemberAreasActions.getMemberAreasFail({ payload: error })))
      ))
  ));

}