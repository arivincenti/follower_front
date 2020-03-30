import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { OrganizationsService } from "../../../../services/organizations/organizations.service";
import { of } from "rxjs";
import * as OrganizationActions from "../../../actions/userOrganizations/selectedOrganization/organization.actions";
import * as AreasActions from "../../../actions/userOrganizations/selectedOrganization/areas/areas/areas.actions";
import * as MembersActions from "../../../actions/userOrganizations/selectedOrganization/members/members/members.actions";
import { OrganizationModel } from "src/app/models/organization.model";
import Swal from "sweetalert2";

@Injectable()
export class OrganizationEffects {
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
  ) {}

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
            MembersActions.getMembers({ payload: organization })
          ]),
          catchError(error =>
            of(OrganizationActions.getOrganizationFail(error.error))
          )
        )
      )
    )
  );

  updateOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.updateOrganization),
      mergeMap(action =>
        this._organizationsService
          .updateOrganization(action.organizationId, action.payload)
          .pipe(
            map((organization: OrganizationModel) =>
              OrganizationActions.updateOrganizationSuccess({
                organization: organization
              })
            ),
            catchError(error =>
              of(
                OrganizationActions.updateOrganizationFail({
                  payload: error.error
                })
              )
            )
          )
      )
    )
  );

  deleteOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.deleteOrganization),
      mergeMap(action =>
        this._organizationsService.deleteOrganization(action.payload).pipe(
          map((organization: OrganizationModel) => {
            Swal.fire({
              position: "top-end",
              toast: true,
              icon: "success",
              title: "Genial!!",
              text: "La organización se dio de baja con éxito",
              showConfirmButton: false,
              timer: 2500
            });
            return OrganizationActions.deleteOrganizationSuccess({
              organization: organization
            });
          }),
          catchError(error =>
            of(
              OrganizationActions.deleteOrganizationFail({
                payload: error.error
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
