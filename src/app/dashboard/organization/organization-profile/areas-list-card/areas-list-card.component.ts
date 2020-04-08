import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { AreaModel } from "src/app/models/area.model";
import { UserModel } from "src/app/models/user.model";
import { Observable, Subscription } from "rxjs";
import { OrganizationModel } from "src/app/models/organization.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { Router } from "@angular/router";
import * as AreaActions from "../../../../store/actions/userOrganizations/selectedOrganization/areas/area/area.actions";
import { MemberModel } from "src/app/models/member.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-areas-list-card",
  templateUrl: "./areas-list-card.component.html",
  styleUrls: ["./areas-list-card.component.css"],
})
export class AreasListCardComponent implements OnInit, OnDestroy {
  @Input() organization: OrganizationModel;
  @Input() area: AreaModel;
  @Input() user: UserModel;

  membersSubscription: Subscription = new Subscription();
  members: MemberModel[];
  members$: Observable<MemberModel[]>;
  membersLoading: boolean = false;
  areasLoading$: Observable<boolean>;
  animation$: Observable<string[]>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.animation$ = this.store.select((state) => state.ui.animated);

    this.areasLoading$ = this.store.select(
      (state) =>
        state.userOrganizations.selectedOrganization.areas.areas.loading
    );

    //Traigo todos los miembros de la organizacion y los filtro para que cada area tenga sus respectivos miembros
    this.members$ = this.store
      .select(
        (state) =>
          state.userOrganizations.selectedOrganization.members.members.members
      )
      .pipe(
        map((members: any) => {
          var membersFiltered = [];

          members.forEach((member: MemberModel) => {
            member.areas.forEach((area: any) => {
              if (area === this.area._id) {
                membersFiltered.push(member);
              }
            });
          });

          return membersFiltered;
        })
      );
  }

  ngOnDestroy() {
    this.membersSubscription.unsubscribe();
  }

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
