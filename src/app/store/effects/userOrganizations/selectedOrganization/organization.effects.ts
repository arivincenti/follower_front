import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { OrganizationsService } from "../../../../services/organizations/organizations.service";
import { of } from "rxjs";
import * as OrganizationActions from "../../../actions/userOrganizations/selectedOrganization/organization.actions";
import * as AreasActions from "../../../actions/userOrganizations/selectedOrganization/areas/areas/areas.actions";
import * as MembersActions from "../../../actions/userOrganizations/selectedOrganization/members/members/members.actions";
import { OrganizationModel } from "src/app/models/organization.model";

@Injectable()
export class OrganizationEffects {
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
  ) {}

  getOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.getOrganization),
      mergeMap((action) =>
        this._organizationsService.getOrganization(action.organization).pipe(
          mergeMap((organization: any) => [
            OrganizationActions.getOrganizationSuccess({
              payload: organization,
            }),
            AreasActions.getAreas({ payload: organization, since: 0, size: 0 }),
            MembersActions.getMembers({ payload: organization }),
          ]),
          catchError((error) =>
            of(OrganizationActions.getOrganizationFail(error.error))
          )
        )
      )
    )
  );

  createOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.createOrganization),
      mergeMap((action) =>
        this._organizationsService.createOrganization(action.payload).pipe(
          map((organization: OrganizationModel) =>
            OrganizationActions.createOrganizationSuccess({
              organization: organization,
            })
          ),
          catchError((error) =>
            of(
              OrganizationActions.createOrganizationFail({
                payload: error.error,
              })
            )
          )
        )
      )
    )
  );

  updateOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.updateOrganization),
      mergeMap((action) =>
        this._organizationsService
          .updateOrganization(action.organizationId, action.payload)
          .pipe(
            map((organization: OrganizationModel) =>
              OrganizationActions.updateOrganizationSuccess({
                organization: organization,
              })
            ),
            catchError((error) =>
              of(
                OrganizationActions.updateOrganizationFail({
                  payload: error.error,
                })
              )
            )
          )
      )
    )
  );

  desactivateOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.desactivateOrganization),
      mergeMap((action) =>
        this._organizationsService.desactivateOrganization(action.payload).pipe(
          map((organization: OrganizationModel) =>
            OrganizationActions.desactivateOrganizationSuccess({
              organization: organization,
            })
          ),
          catchError((error) =>
            of(
              OrganizationActions.desactivateOrganizationFail({
                payload: error.error,
              })
            )
          )
        )
      )
    )
  );

  activateOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.activateOrganization),
      mergeMap((action) =>
        this._organizationsService.activateOrganization(action.payload).pipe(
          map((organization: OrganizationModel) =>
            OrganizationActions.activateOrganizationSuccess({
              organization: organization,
            })
          ),
          catchError((error) =>
            of(
              OrganizationActions.activateOrganizationFail({
                payload: error.error,
              })
            )
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
