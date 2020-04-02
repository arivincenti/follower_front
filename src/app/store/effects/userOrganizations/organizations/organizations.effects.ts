import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { OrganizationsService } from "src/app/services/organizations/organizations.service";
import { of } from "rxjs";
import { OrganizationModel } from "src/app/models/organization.model";
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

  clearOrganizationState$ = createEffect(
    () => this.actions$.pipe(ofType(OrganizationsActions.clearState)),
    { dispatch: false }
  );
}
