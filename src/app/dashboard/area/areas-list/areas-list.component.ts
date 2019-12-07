import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.css']
})
export class AreasListComponent implements OnInit, OnDestroy {

  @Input() organization: OrganizationModel;
  @Input() user: UserModel;
  areas$: Observable<AreaModel[]>;
  loading$: Observable<boolean>;
  animation$: Observable<string[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.animation$ = this.store.select(state => state.ui.animated);
    this.areas$ = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas);

    this.loading$ = this.store.select(state => state.userOrganizations.selectedOrganization.areas.loading);
  }

  ngOnDestroy()
  {
    // this.store.dispatch(OrganizationAreasActions.clearState());
  }

}
