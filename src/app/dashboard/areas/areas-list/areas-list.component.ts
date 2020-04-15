import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { Observable } from "rxjs";
import { AreaModel } from "src/app/models/area.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { PageEvent, MatDialog } from "@angular/material";
import { map } from "rxjs/operators";
import { AreaFormComponent } from "../../../shared/forms/area-form/area-form.component";
import { organization } from "src/app/store/selectors/userOrganizations/organization/organization/organization.selector";
import {
  areasLoading,
  areas,
} from "src/app/store/selectors/userOrganizations/organization/areas/areas.selector";
import { getAreas } from "src/app/store/actions/userOrganizations/selectedOrganization/areas/areas.actions";

@Component({
  selector: "app-areas-list",
  templateUrl: "./areas-list.component.html",
  styleUrls: ["./areas-list.component.css"],
})
export class AreasListComponent implements OnInit, OnDestroy {
  @Input() organization: OrganizationModel;
  //Observable variables
  user: UserModel;

  areas$: Observable<AreaModel[]>;
  areasLoading$: Observable<boolean>;
  filterAreas: AreaModel[];

  searchArea: string = "";

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

    this.store.dispatch(
      getAreas({ payload: this.organization, since: 0, size: 0 })
    );

    this.areasLoading$ = this.store.select(areasLoading);

    this.areas$ = this.store
      .select(areas)
      .pipe(map((areas) => (this.filterAreas = areas)));
  }

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
        area: null,
      },
    });
  }
}
