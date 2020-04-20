import { Component, OnInit, Input } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { OrganizationModel } from "src/app/models/organization.model";
import { PageEvent } from "@angular/material";
import { Observable } from "rxjs";

@Component({
  selector: "app-organization-list",
  templateUrl: "./organizations-list.component.html",
  styleUrls: ["./organizations-list.component.css"],
})
export class OrganizationsListComponent implements OnInit {
  @Input() organizations: OrganizationModel[];
  @Input() user: UserModel;

  //Paginator variables
  pageIndex: number = 0;
  pageSize: number = 5;
  since: number;
  until: number;
  pageSizeOptions: number[] = [5, 10, 15, 20];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor() {}

  ngOnInit() {
    this.since = this.pageIndex;
    this.until = this.pageSize;
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
}
