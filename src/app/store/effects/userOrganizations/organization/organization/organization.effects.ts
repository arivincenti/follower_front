import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as OrganizationActions from "@actions/organization";
import * as OrganizationsActions from "@actions/organizations";
import { mergeMap, map, catchError, switchMap } from "rxjs/operators";
import { OrganizationsService } from "src/app/services/organizations/organizations.service";
import { OrganizationModel } from "src/app/models/organization.model";
import { of } from "rxjs";

@Injectable()
export class OrganizationEffects {
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
  ) {}

  getOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.getOrganization),
      switchMap((action) =>
        this._organizationsService.getOrganization(action.payload).pipe(
          map((organization: OrganizationModel) =>
            OrganizationActions.getOrganizationSuccess({ organization })
          ),
          catchError((error) =>
            of(
              OrganizationActions.getOrganizationFail({ payload: error.error })
            )
          )
        )
      )
    )
  );

  createOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.createOrganization),
      switchMap((action) =>
        this._organizationsService.createOrganization(action.payload).pipe(
          mergeMap((organization: OrganizationModel) => [
            OrganizationActions.createOrganizationSuccess({
              organization: organization,
            }),
            OrganizationsActions.addCreatedOrganizationToList({ organization }),
          ]),
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
      switchMap((action) =>
        this._organizationsService
          .updateOrganization(action.organizationId, action.payload)
          .pipe(
            mergeMap((organization: OrganizationModel) => [
              OrganizationActions.updateOrganizationSuccess({
                organization: organization,
              }),
              OrganizationsActions.updateOrganizationList({ organization }),
            ]),
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
      switchMap((action) =>
        this._organizationsService.desactivateOrganization(action.payload).pipe(
          mergeMap((organization: OrganizationModel) => [
            OrganizationActions.desactivateOrganizationSuccess({
              organization: organization,
            }),
            OrganizationsActions.updateOrganizationList({ organization }),
          ]),
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
      switchMap((action) =>
        this._organizationsService.activateOrganization(action.payload).pipe(
          mergeMap((organization: OrganizationModel) => [
            OrganizationActions.activateOrganizationSuccess({
              organization: organization,
            }),
            OrganizationsActions.updateOrganizationList({ organization }),
          ]),
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
}
