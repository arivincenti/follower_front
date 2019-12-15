import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { Observable } from "rxjs";
import { AreaModel } from "src/app/models/area.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { PageEvent } from "@angular/material";

@Component({
  selector: "app-areas-list",
  templateUrl: "./areas-list.component.html",
  styleUrls: ["./areas-list.component.css"]
})
export class AreasListComponent implements OnInit, OnDestroy
{
  //Inputs
  @Input() organization: OrganizationModel;
  @Input() user: UserModel;
  @Input() areas: AreaModel[];
  @Input() animation: string[];

  //Observable variables
  loading$: Observable<boolean>;

  //Paginator variables
  pageIndex: number = 0;
  pageSize: number = 3;
  since: number;
  until: number;
  pageSizeOptions: number[] = [3, 6, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private store: Store<AppState>) { }

  // ==================================================
  // Init component
  // ==================================================
  ngOnInit()
  {
    this.since = this.pageIndex;
    this.until = this.pageSize;

    this.loading$ = this.store.select(
      state => state.userOrganizations.selectedOrganization.areas.loading
    );
  }

  // ==================================================
  // Set paginator page size
  // ==================================================
  setPageSizeOptions(setPageSizeOptionsInput: string)
  {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  // ==================================================
  // Change Page
  // ==================================================
  changePage($event: PageEvent)
  {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;

    this.since = this.pageIndex * this.pageSize;

    if (this.pageIndex)
    {
      this.until = this.pageIndex * this.pageSize + this.pageSize;
    } else
    {
      this.until = this.pageSize;
    }
  }

  // ==================================================
  // Destroy component
  // ==================================================
  ngOnDestroy()
  {
    // this.store.dispatch(OrganizationAreasActions.clearState());
  }
}
