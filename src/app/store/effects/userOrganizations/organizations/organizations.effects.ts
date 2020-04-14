import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { OrganizationsService } from "src/app/services/organizations/organizations.service";
import { of } from "rxjs";
import { OrganizationModel } from "src/app/models/organization.model";
import * as OrganizationsActions from "../../../actions/userOrganizations/organizations/organizations.actions";
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
      mergeMap((action) =>
        this._organizationsService.getOrganizations(action.payload).pipe(
          map((data: any) =>
            OrganizationsActions.getOrganizationsSuccess({ payload: data.data })
          ),
          catchError((error) =>
            of(OrganizationsActions.getOrganizationsFail(error.error))
          )
        )
      )
    )
  );

  createOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.createOrganization),
      mergeMap((action) =>
        this._organizationsService.createOrganization(action.payload).pipe(
          map((organization: OrganizationModel) =>
            OrganizationsActions.createOrganizationSuccess({
              organization: organization,
            })
          ),
          catchError((error) =>
            of(
              OrganizationsActions.createOrganizationFail({
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
      ofType(OrganizationsActions.updateOrganization),
      mergeMap((action) =>
        this._organizationsService
          .updateOrganization(action.organizationId, action.payload)
          .pipe(
            map((organization: OrganizationModel) =>
              OrganizationsActions.updateOrganizationSuccess({
                organization: organization,
              })
            ),
            catchError((error) =>
              of(
                OrganizationsActions.updateOrganizationFail({
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
      ofType(OrganizationsActions.desactivateOrganization),
      mergeMap((action) =>
        this._organizationsService.desactivateOrganization(action.payload).pipe(
          map((organization: OrganizationModel) =>
            OrganizationsActions.desactivateOrganizationSuccess({
              organization: organization,
            })
          ),
          catchError((error) =>
            of(
              OrganizationsActions.desactivateOrganizationFail({
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
      ofType(OrganizationsActions.activateOrganization),
      mergeMap((action) =>
        this._organizationsService.activateOrganization(action.payload).pipe(
          map((organization: OrganizationModel) =>
            OrganizationsActions.activateOrganizationSuccess({
              organization: organization,
            })
          ),
          catchError((error) =>
            of(
              OrganizationsActions.activateOrganizationFail({
                payload: error.error,
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
