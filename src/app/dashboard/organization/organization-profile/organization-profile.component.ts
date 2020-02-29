import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { AreaModel } from "src/app/models/area.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { ActivatedRoute, Router } from "@angular/router";
import * as OrganizationActions from "../../../store/actions/userOrganizations/selectedOrganization/organization.actions";
import { MatDialog } from "@angular/material";
import { AreaFormComponent } from "../../area/area-form/area-form.component";
import { MemberFormComponent } from "../../member/member-form/member-form.component";
import { MemberModel } from "src/app/models/member.model";
import { map, takeUntil } from "rxjs/operators";
import { OrganizationFormComponent } from "../organization-form/organization-form.component";

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

  //Areas
  areas$: Observable<AreaModel[]>;
  areasLoading$: Observable<boolean>;
  areasLoaded$: Observable<boolean>;
  filterAreas: AreaModel[];

  //Member Areas
  memberAreas$: Observable<AreaModel[]>;
  memberAreasLoading: boolean = false;
  filterMemberAreas: AreaModel[];

  //Members
  members$: Observable<MemberModel[]>;
  membersLoading$: Observable<boolean>;
  membersLoaded$: Observable<boolean>;
  filterMembers: MemberModel[];

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.param = this.activatedRoute.snapshot.paramMap.get("id");

    this.store
      .select(state => state.auth.user)
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(user => (this.user = user));

    this.animation$ = this.store.select(state => state.ui.animated);

    //Loadings
    this.areasLoading$ = this.store.select(
      state => state.userOrganizations.selectedOrganization.areas.areas.loading
    );

    this.areasLoaded$ = this.store.select(
      state => state.userOrganizations.selectedOrganization.areas.areas.loaded
    );

    this.membersLoading$ = this.store.select(
      state =>
        state.userOrganizations.selectedOrganization.members.members.loading
    );

    this.membersLoaded$ = this.store.select(
      state =>
        state.userOrganizations.selectedOrganization.members.members.loaded
    );

    this.organizationLoading$ = this.store.select(
      state => state.userOrganizations.selectedOrganization.organization.loading
    );

    /////////////////////////////////////////////////////

    this.store.dispatch(
      OrganizationActions.getOrganization({ organization: this.param })
    );

    this.organization$ = this.store
      .select(
        state =>
          state.userOrganizations.selectedOrganization.organization.organization
      )
      .pipe(map(organization => (this.organization = organization)));

    this.areas$ = this.store
      .select(
        state => state.userOrganizations.selectedOrganization.areas.areas.areas
      )
      .pipe(map(areas => (this.filterAreas = areas)));

    this.members$ = this.store
      .select(
        state =>
          state.userOrganizations.selectedOrganization.members.members.members
      )
      .pipe(map(members => (this.filterMembers = members)));

    this.memberAreas$ = this.store
      .select(
        state => state.userOrganizations.selectedOrganization.areas.areas.areas
      )
      .pipe(
        map(areas => {
          this.filterMemberAreas = [];
          areas.forEach(area => {
            if (
              area.members.find(member => member.user._id === this.user._id)
            ) {
              this.filterMemberAreas.push(area);
            }
          });
          return this.filterMemberAreas;
        })
      );
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

  createMember(): void {
    this.dialog.open(MemberFormComponent, {
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
