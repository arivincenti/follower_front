import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { AreaModel } from "src/app/models/area.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { Router, ActivatedRoute } from "@angular/router";
import { UserModel } from "src/app/models/user.model";
import { tap } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { AreaFormComponent } from "../../../shared/forms/area-form/area-form.component";
import {
  area,
  areaLoading,
  areaError,
} from "src/app/store/selectors/userOrganizations/organization/area/area.selector";
import { SubSink } from "subsink";
import { NotificationsService } from "src/app/services/notifications/notifications.service";
import { getArea } from "src/app/store/actions/userOrganizations/organization/area/area.actions";

@Component({
  selector: "app-area-profile",
  templateUrl: "./area-profile.component.html",
  styleUrls: ["./area-profile.component.css"],
})
export class AreaProfileComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  param: string;
  user: UserModel;

  area$: Observable<AreaModel>;
  area: AreaModel;
  areaLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private _notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this.param = this.activatedRoute.snapshot.paramMap.get("id");
    var auth = JSON.parse(localStorage.getItem("auth"));
    this.user = auth.user;

    this.store.dispatch(getArea({ payload: this.param }));

    this.area$ = this.store
      .select(area)
      .pipe(tap((area) => (this.area = area)));

    this.areaLoading$ = this.store.select(areaLoading);

    this.subs.add(
      this.store.select(areaError).subscribe((error) => {
        if (error) {
          var notification = {
            type: "error",
            title: "Oops, parece que hay un problema",
            message: error.message,
          };
          this._notificationService.genericNotification(notification);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

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
