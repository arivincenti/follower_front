import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { AreaModel } from "src/app/models/area.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { Router, ActivatedRoute } from "@angular/router";
import { UserModel } from "src/app/models/user.model";
import { map, filter } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { AreaFormComponent } from "../../../shared/forms/area-form/area-form.component";
import {
  areaSelected,
  areasLoading,
} from "src/app/store/selectors/userOrganizations/selectedOrganization/areas/areas.selector";

@Component({
  selector: "app-area-profile",
  templateUrl: "./area-profile.component.html",
  styleUrls: ["./area-profile.component.css"],
})
export class AreaProfileComponent implements OnInit, OnDestroy {
  animation$: Observable<string[]>;
  param: string;
  user: UserModel;

  area$: Observable<AreaModel>;
  area: AreaModel;
  areaLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.param = this.activatedRoute.snapshot.paramMap.get("id");
    var auth = JSON.parse(localStorage.getItem("auth"));
    this.user = auth.user;

    // this.store.dispatch(AreaActions.getArea({ payload: this.param }));

    this.area$ = this.store.select(areaSelected, this.param).pipe(
      filter((area) => area !== null),
      map((area) => (this.area = area))
    );

    this.areaLoading$ = this.store.select(areasLoading);
  }

  ngOnDestroy() {}

  backToLastPage() {
    this.router.navigate([
      "app/organizations/profile",
      this.area.organization._id,
    ]);
  }

  updateArea(area: AreaModel) {
    this.dialog.open(AreaFormComponent, {
      width: "600px",
      data: {
        user: this.user,
        organization: area.organization,
        area: area,
      },
    });
  }
}
