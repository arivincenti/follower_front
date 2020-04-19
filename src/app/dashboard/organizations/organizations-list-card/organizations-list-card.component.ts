import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import * as OrganizationActions from "../../../store/actions/userOrganizations/organization/organization/organization.actions";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-organization-list-card",
  templateUrl: "./organizations-list-card.component.html",
  styleUrls: ["./organizations-list-card.component.css"],
})
export class OrganizationsListCardComponent implements OnInit, OnDestroy {
  @Input() organization: OrganizationModel;
  @Input() user: UserModel;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {}

  ngOnDestroy() {}

  selectOrganization(organization: OrganizationModel) {
    this.router.navigate(["app/organizations/profile/", organization._id]);
  }

  desactivateOrganization(organization: OrganizationModel) {
    var payload = {
      organization: organization,
      deleted_at: new Date(),
      updated_by: this.user,
    };
    this.store.dispatch(
      OrganizationActions.desactivateOrganization({
        payload,
      })
    );
  }

  activateOrganization(organization: OrganizationModel) {
    var payload = {
      organization: organization,
      deleted_at: undefined,
      updated_by: this.user,
    };

    this.store.dispatch(
      OrganizationActions.activateOrganization({
        payload,
      })
    );
  }
}
