import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError } from "rxjs/operators";
import { OrganizationsService } from "../../../../services/organizations/organizations.service";
import { of } from "rxjs";
import * as OrganizationActions from "../../../actions/userOrganizations/selectedOrganization/organization.actions";
import * as AreasActions from "../../../actions/userOrganizations/selectedOrganization/areas/areas/areas.actions";
import * as MemberAreasActions from "../../../actions/userOrganizations/selectedOrganization/members/memberAreas/memberAreas.actions";
import * as MembersActions from "../../../actions/userOrganizations/selectedOrganization/members/members/members.actions";

@Injectable()
export class OrganizationEffects
{
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
  ) { }

  getOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.getOrganization),
      mergeMap(action =>
        this._organizationsService.getOrganization(action.organization).pipe(
          mergeMap((organization: any) => [
            OrganizationActions.getOrganizationSuccess({
              payload: organization
            }),
            AreasActions.getAreas({ payload: organization, since: 0, size: 0 }),
            // MemberAreasActions.getMemberAreas({
            //   user: action.user,
            //   organization: organization._id
            // }),
            MembersActions.getMembers({ payload: organization })
          ]),
          catchError(error =>
            of(OrganizationActions.getOrganizationFail(error.error))
          )
        )
      )
    )
  );

  clearSelectedOrganizationState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrganizationActions.clearSelectedOrganizationState)
      ),
    { dispatch: false }
  );
}
