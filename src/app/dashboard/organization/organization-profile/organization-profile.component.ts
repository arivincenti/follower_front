import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AreaFormComponent } from "../../../shared/forms/area-form/area-form.component";
import { map } from "rxjs/operators";
import { OrganizationFormComponent } from "../../../shared/forms/organization-form/organization-form.component";
import { organization } from "src/app/store/selectors/userOrganizations/selectedOrganization/organization/organization.selector";
import { organizationsLoading } from "src/app/store/selectors/userOrganizations/organizations/organizations.selector";

@Component({
  selector: "app-organization-profile",
  templateUrl: "./organization-profile.component.html",
  styleUrls: ["./organization-profile.component.css"],
})
export class OrganizationProfileComponent implements OnInit, OnDestroy {
  //Subscriptions

  organization$: Observable<OrganizationModel>;
  organizationLoading$: Observable<boolean>;
  user: UserModel;
  organization: OrganizationModel;

  //Filter & counter
  param: string;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.param = this.activatedRoute.snapshot.paramMap.get("id");

    var auth = JSON.parse(localStorage.getItem("auth"));
    this.user = auth.user;

    this.organizationLoading$ = this.store.select(organizationsLoading);

    /////////////////////////////////////////////////////

    // this.store.dispatch(getOrganization({ organization: this.param }));

    this.organization$ = this.store
      .select(organization, this.param)
      .pipe(map((organization) => (this.organization = organization)));
  }

  ngOnDestroy() {}

  createArea(): void {
    this.dialog.open(AreaFormComponent, {
      width: "600px",
      data: {
        user: this.user,
        organization: this.organization,
        area: null,
      },
    });
  }

  updateOrganization(organization: OrganizationModel): void {
    this.dialog.open(OrganizationFormComponent, {
      width: "600px",
      data: {
        organization: organization,
        user: this.user,
      },
    });
  }

  backToLastPage() {
    this.router.navigate(["app/organizations"]);
  }
}
