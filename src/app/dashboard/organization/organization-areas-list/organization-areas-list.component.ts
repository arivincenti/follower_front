import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Observable } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as UiActions from '../../../store/actions/ui/ui.actions';

@Component({
  selector: 'app-organization-areas-list',
  templateUrl: './organization-areas-list.component.html',
  styleUrls: ['./organization-areas-list.component.css']
})
export class OrganizationAreasListComponent implements OnInit, OnDestroy
{

  @Input() organization: OrganizationModel;
  @Input() user: UserModel;
  areas$: Observable<AreaModel[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.areas$ = this.store.select(state => state.selectedOrganization.organizationAreas.organizationAreas.areas);

    this.loading$ = this.store.select(state => state.selectedOrganization.organizationAreas.organizationAreas.loading);
  }

  ngOnDestroy()
  {
    // this.store.dispatch(OrganizationAreasActions.clearState());
  }

  addArea()
  {
    this.store.dispatch(UiActions.showAreaModal());
  }

}
