import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { Observable } from "rxjs";
import { AreaModel } from "src/app/models/area.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { PageEvent, MatDialog } from "@angular/material";
import { map } from "rxjs/operators";
import { AreaFormComponent } from "../../../../shared/area-form/area-form.component";

@Component({
  selector: "app-areas-list",
  templateUrl: "./areas-list.component.html",
  styleUrls: ["./areas-list.component.css"]
})
export class AreasListComponent implements OnInit, OnDestroy {
  //Observable variables
  animation$: Observable<string[]>;

  organization$: Observable<OrganizationModel>;
  organization: OrganizationModel;
  user: UserModel;

  areas$: Observable<AreaModel[]>;
  areasLoading$: Observable<boolean>;
  filterAreas: AreaModel[];

  //Paginator variables
  pageIndex: number = 0;
  pageSize: number = 5;
  since: number;
  until: number;
  pageSizeOptions: number[] = [5, 10, 15, 20];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  // ==================================================
  // Init component
  // ==================================================
  ngOnInit() {
    this.since = this.pageIndex;
    this.until = this.pageSize;

    var auth = JSON.parse(localStorage.getItem("auth"));
    this.user = auth.user;

    this.animation$ = this.store.select(state => state.ui.animated);

    this.areasLoading$ = this.store.select(
      state => state.userOrganizations.selectedOrganization.areas.areas.loading
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

  // ==================================================
  // Destroy component
  // ==================================================
  ngOnDestroy() {}

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
}
