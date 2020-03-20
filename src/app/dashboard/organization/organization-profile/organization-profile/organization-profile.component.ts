import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { ActivatedRoute, Router } from "@angular/router";
import { getOrganization } from "../../../../store/actions/userOrganizations/selectedOrganization/organization.actions";
import { MatDialog } from "@angular/material";
import { AreaFormComponent } from "../../../../shared/area-form/area-form.component";
import { map } from "rxjs/operators";
import { OrganizationFormComponent } from "../../../../shared/organization-form/organization-form.component";

@Component({
  selector: "app-organization-profile",
  templateUrl: "./organization-profile.component.html",
  styleUrls: ["./organization-profile.component.css"]
})
export class OrganizationProfileComponent implements OnInit, OnDestroy {
  //Subscriptions
  private unsuscribe$ = new Subject();

  organization$: Observable<OrganizationModel>;
  organizationLoading$: Observable<boolean>;
  user: UserModel;
  animation$: Observable<string[]>;
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

    this.animation$ = this.store.select(state => state.ui.animated);

    this.organizationLoading$ = this.store.select(
      state => state.userOrganizations.selectedOrganization.organization.loading
    );

    /////////////////////////////////////////////////////

    this.store.dispatch(getOrganization({ organization: this.param }));

    this.organization$ = this.store
      .select(
        state =>
          state.userOrganizations.selectedOrganization.organization.organization
      )
      .pipe(map(organization => (this.organization = organization)));

    // this.memberAreas$ = this.store
    //   .select(
    //     state => state.userOrganizations.selectedOrganization.areas.areas.areas
    //   )
    //   .pipe(
    //     map(areas => {
    //       this.filterMemberAreas = [];
    //       areas.forEach(area => {
    //         if (
    //           area.members.find(member => member.user._id === this.user._id)
    //         ) {
    //           this.filterMemberAreas.push(area);
    //         }
    //       });
    //       return this.filterMemberAreas;
    //     })
    //   );
  }

  ngOnDestroy() {
    //Nos desuscribimos de los observables
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }

  createArea(): void {
    this.dialog.open(AreaFormComponent, {
      width: "600px",
      data: {
        user: this.user,
        organization: this.organization,
        area: null
      }
    });
  }

  updateOrganization(organization: OrganizationModel): void {
    this.dialog.open(OrganizationFormComponent, {
      width: "600px",
      data: {
        organization: organization,
        user: this.user
      }
    });
  }

  backToLastPage() {
    this.router.navigate(["app/organizations"]);
  }
}
