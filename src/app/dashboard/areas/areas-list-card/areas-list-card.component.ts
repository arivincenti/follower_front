import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { AreaModel } from "src/app/models/area.model";
import { UserModel } from "src/app/models/user.model";
import { Observable } from "rxjs";
import { OrganizationModel } from "src/app/models/organization.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { Router } from "@angular/router";
import * as AreaActions from "../../../store/actions/userOrganizations/organization/area/area.actions";
import { areasLoading } from "src/app/store/selectors/userOrganizations/organization/areas/areas.selector";

@Component({
  selector: "app-areas-list-card",
  templateUrl: "./areas-list-card.component.html",
  styleUrls: ["./areas-list-card.component.css"],
})
export class AreasListCardComponent implements OnInit, OnDestroy {
  @Input() organization: OrganizationModel;
  @Input() area: AreaModel;
  @Input() user: UserModel;

  areasLoading$: Observable<boolean>;
  areaLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.areasLoading$ = this.store.select(areasLoading);
  }

  ngOnDestroy() {}

  selectArea(area: AreaModel) {
    //Redirect to Area Profile
    this.router.navigate([`${this.router.url}/area/`, area._id]);
  }

  desactivateArea(area: AreaModel) {
    let payload = {
      area: area,
      deleted_at: new Date(),
      organization: this.organization._id,
      updated_by: this.user._id,
    };
    //Make method to update deleted_at property from area
    this.store.dispatch(
      AreaActions.desactivateArea({ areaId: area._id, payload })
    );
  }

  activateArea(area: AreaModel) {
    let payload = {
      area: area,
      deleted_at: undefined,
      organization: this.organization._id,
      updated_by: this.user._id,
    };

    this.store.dispatch(
      AreaActions.activateArea({ areaId: area._id, payload })
    );
  }
}
