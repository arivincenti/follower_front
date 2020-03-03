import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { OrganizationsService } from "src/app/services/organizations/organizations.service";
import { of } from "rxjs";
import { OrganizationModel } from "src/app/models/organization.model";
import { AreasService } from "src/app/services/areas/areas.service";
import * as OrganizationsActions from "../../../actions/userOrganizations/organizations/organizations.actions";
import * as OrganizationActions from "../../../actions/userOrganizations/selectedOrganization/organization.actions";

import Swal from "sweetalert2";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";

@Injectable()
export class OrganizationsEffects {
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService,
    private store: Store<AppState>
  ) {}

  getOrganizations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.getOrganizations),
      mergeMap(action =>
        this._organizationsService.getOrganizations(action.payload).pipe(
          map((data: any) =>
            OrganizationsActions.getOrganizationsSuccess({ payload: data.data })
          ),
          catchError(error =>
            of(OrganizationsActions.getOrganizationsFail(error.error))
          )
        )
      )
    )
  );

  createOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.createOrganization),
      mergeMap(action =>
        this._organizationsService.createOrganization(action.payload).pipe(
          map((organization: OrganizationModel) => {
            Swal.fire({
              position: "top-end",
              toast: true,
              icon: "success",
              title: "Genial!!",
              text: "La organización se creó con éxito",
              showConfirmButton: false,
              timer: 2500
            });
            return OrganizationsActions.createOrganizationSuccess({
              organization: organization
            });
          }),
          catchError(error =>
            of(
              OrganizationsActions.createOrganizationFail({
                payload: error.error
              })
            )
          )
        )
      )
    )
  );

  updateOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.updateOrganization),
      mergeMap(action =>
        this._organizationsService
          .updateOrganization(action.organizationId, action.payload)
          .pipe(
            map((organization: OrganizationModel) => {
              Swal.fire({
                position: "top-end",
                toast: true,
                icon: "success",
                title: "Genial!!",
                text: "La organización se actualizó con éxito",
                showConfirmButton: false,
                timer: 2500
              });

              this.store.dispatch(
                OrganizationActions.getOrganization({
                  organization: organization._id
                })
              );
              return OrganizationsActions.updateOrganizationSuccess({
                organization: organization
              });
            }),
            catchError(error =>
              of(
                OrganizationsActions.updateOrganizationFail({
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
      ofType(OrganizationsActions.deleteOrganization),
      mergeMap(action =>
        this._organizationsService.deleteOrganization(action.organization).pipe(
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
            return OrganizationsActions.deleteOrganizationSuccess({
              organization: organization
            });
          }),
          catchError(error =>
            of(
              OrganizationsActions.deleteOrganizationFail({
                payload: error.error
              })
            )
          )
        )
      )
    )
  );

  clearOrganizationState$ = createEffect(
    () => this.actions$.pipe(ofType(OrganizationsActions.clearState)),
    { dispatch: false }
  );
}
