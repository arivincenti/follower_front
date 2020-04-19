import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { OrganizationsService } from "src/app/services/organizations/organizations.service";
import { of } from "rxjs";
import * as OrganizationsActions from "@actions/organizations";

@Injectable()
export class OrganizationsEffects {
  constructor(
    private actions$: Actions,
    private _organizationsService: OrganizationsService
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

  clearOrganizationState$ = createEffect(
    () => this.actions$.pipe(ofType(OrganizationsActions.clearState)),
    { dispatch: false }
  );
}
