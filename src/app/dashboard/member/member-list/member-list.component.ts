import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { Observable, Subject } from "rxjs";
import { MemberModel } from "src/app/models/member.model";
import { PageEvent, MatDialog } from "@angular/material";
import { AreaModel } from "src/app/models/area.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { map, takeUntil } from "rxjs/operators";
import { MemberFormComponent } from "../../../shared/member-form/member-form.component";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit, OnDestroy {
  @Input() area: AreaModel;

  private unsuscribe$ = new Subject();

  organization$: Observable<OrganizationModel>;
  organization: OrganizationModel;
  user: UserModel;

  animation$: Observable<string[]>;
  members$: Observable<MemberModel[]>;
  membersLoading$: Observable<boolean>;
  membersLoaded$: Observable<boolean>;
  filterMembers: MemberModel[];

  //Paginator variables
  pageIndex: number = 0;
  pageSize: number = 5;
  since: number;
  until: number;
  pageSizeOptions: number[] = [5, 10, 15, 20];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.animation$ = this.store.select(state => state.ui.animated);

    var auth = JSON.parse(localStorage.getItem("auth"));
    this.user = auth.user;

    this.organization$ = this.store
      .select(
        state =>
          state.userOrganizations.selectedOrganization.organization.organization
      )
      .pipe(
        map(
          (organization: OrganizationModel) =>
            (this.organization = organization)
        )
      );

    this.membersLoading$ = this.store.select(
      state =>
        state.userOrganizations.selectedOrganization.members.members.loading
    );

    this.members$ = this.store
      .select(
        state =>
          state.userOrganizations.selectedOrganization.members.members.members
      )
      .pipe(map(members => (this.filterMembers = members)));

    // if(this.area){
    //   this.filterMembers = this.area.members;
    // }else{
    //   this.members$ = this.store
    //   .select(
    //     state =>
    //       state.userOrganizations.selectedOrganization.members.members.members
    //   )
    //   .pipe(map(members => (this.filterMembers = members)));
    // }

    this.since = this.pageIndex;
    this.until = this.pageSize;
  }

  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.unsubscribe();
  }

  // ==================================================
  // Set paginator page size
  // ==================================================
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  // ==================================================
  // Change Page
  // ==================================================
  changePage($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;

    this.since = this.pageIndex * this.pageSize;

    if (this.pageIndex) {
      this.until = this.pageIndex * this.pageSize + this.pageSize;
    } else {
      this.until = this.pageSize;
    }
  }

  createMember(): void {
    this.dialog.open(MemberFormComponent, {
      width: "600px",
      data: {
        user: this.user,
        organization: this.organization,
        area: this.area
      }
    });
  }
}
