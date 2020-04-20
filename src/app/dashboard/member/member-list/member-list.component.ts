import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { Observable } from "rxjs";
import { MemberModel } from "src/app/models/member.model";
import { PageEvent, MatDialog } from "@angular/material";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { MemberFormComponent } from "../../../shared/forms/member-form/member-form.component";
import { getMembers } from "@actions/members";
import {
  membersLoading,
  members,
} from "src/app/store/selectors/userOrganizations/organization/organization/members/members.selector";
import { memberLoading } from "src/app/store/selectors/userOrganizations/organization/organization/member/member.selector";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit, OnDestroy {
  @Input() organization: OrganizationModel;

  user: UserModel;

  members$: Observable<MemberModel[]>;
  membersLoading$: Observable<boolean>;
  memberLoading$: Observable<boolean>;

  searchMember: string = "";
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
    var auth = JSON.parse(localStorage.getItem("auth"));
    this.user = auth.user;

    this.store.dispatch(getMembers({ payload: this.organization }));

    this.membersLoading$ = this.store.select(membersLoading);
    this.members$ = this.store.select(members);
    this.memberLoading$ = this.store.select(memberLoading);

    this.since = this.pageIndex;
    this.until = this.pageSize;
  }

  ngOnDestroy() {}

  // ==================================================
  // Set paginator page size
  // ==================================================
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput
      .split(",")
      .map((str) => +str);
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

  createMember() {
    this.dialog.open(MemberFormComponent, {
      width: "600px",
      data: {
        user: this.user,
        organization: this.organization,
        area: null,
      },
    });
  }
}
