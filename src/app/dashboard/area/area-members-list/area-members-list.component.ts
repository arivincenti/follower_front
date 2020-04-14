import { Component, OnInit, Input } from "@angular/core";
import { AreaModel } from "src/app/models/area.model";
import { Observable } from "rxjs";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { MemberModel } from "src/app/models/member.model";
import { PageEvent, MatDialog } from "@angular/material";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { AreaMemberFormComponent } from "src/app/shared/forms/areaMemberForm/area-member-form.component";
import { areaMembers } from "src/app/store/selectors/userOrganizations/selectedOrganization/area/areaMembers.selector";

@Component({
  selector: "app-area-members-list",
  templateUrl: "./area-members-list.component.html",
  styleUrls: ["./area-members-list.component.css"],
})
export class AreaMembersListComponent implements OnInit {
  @Input() area: AreaModel;
  @Input() organization: OrganizationModel;

  // private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  user: UserModel;
  areaMembers$: Observable<MemberModel[]>;
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

    //Buscamos los miembros del area cuando hay un area seleccionada
    this.areaMembers$ = this.store.select(areaMembers, this.area._id);

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
    this.dialog.open(AreaMemberFormComponent, {
      width: "600px",
      data: {
        user: this.user,
        organization: this.organization,
        area: this.area,
      },
    });
  }
}
