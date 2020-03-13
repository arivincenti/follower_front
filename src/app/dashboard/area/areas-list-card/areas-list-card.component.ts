import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { AreaModel } from "src/app/models/area.model";
import { UserModel } from "src/app/models/user.model";
import { Observable, Subscription } from "rxjs";
import { OrganizationModel } from "src/app/models/organization.model";
import { AreasService } from "src/app/services/areas/areas.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { Router } from "@angular/router";
import * as AreasActions from "../../../store/actions/userOrganizations/selectedOrganization/areas/areas/areas.actions";
import { MatDialog } from "@angular/material";
import { AreaFormComponent } from "../area-form/area-form.component";
import { MemberModel } from "src/app/models/member.model";

import { map } from "rxjs/operators";
import { MemberFormComponent } from "../../member/member-form/member-form.component";

@Component({
  selector: "app-areas-list-card",
  templateUrl: "./areas-list-card.component.html",
  styleUrls: ["./areas-list-card.component.css"]
})
export class AreasListCardComponent implements OnInit, OnDestroy {
  @Input() organization: OrganizationModel;
  @Input() area: AreaModel;
  @Input() user: UserModel;

  membersSubscription: Subscription = new Subscription();
  members: MemberModel[];
  members$: Observable<MemberModel[]>;
  membersLoading: boolean = false;
  areasLoading$: Observable<boolean>;
  animations$: Observable<string[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.animations$ = this.store.select(state => state.ui.animated);

    this.areasLoading$ = this.store.select(
      state => state.userOrganizations.selectedOrganization.areas.areas.loading
    );

    //Traigo todos los miembros de la organizacion y los filtro para que cada area tenga sus respectivos miembros
    this.members$ = this.store
      .select(
        state =>
          state.userOrganizations.selectedOrganization.members.members.members
      )
      .pipe(
        map((members: any) => {
          var membersFiltered = [];

          members.forEach((member: MemberModel) => {
            member.areas.forEach((area: any) => {
              if (area === this.area._id) {
                membersFiltered.push(member);
              }
            });
          });

          return membersFiltered;
        })
      );
  }

  ngOnDestroy() {
    this.membersSubscription.unsubscribe();
  }

  selectArea(area: AreaModel) {
    //Redirect to Area Profile
    this.router.navigate(["app/organizations/profile/area", area._id]);
  }

  deleteArea(area: AreaModel) {
    let payload = {
      area: area._id,
      organization: this.organization._id,
      updated_by: this.user._id
    };
    //Make method to update deleted_at property from area
    this.store.dispatch(AreasActions.deleteArea({ payload: payload }));
  }

  activateArea(area: AreaModel) {
    let payload = {
      deleted_at: undefined,
      organization: this.organization._id,
      updated_by: this.user._id
    };

    this.store.dispatch(
      AreasActions.updateArea({ areaId: area._id, payload: payload })
    );
  }
}
