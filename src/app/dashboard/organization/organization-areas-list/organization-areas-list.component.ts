import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Observable } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as UiActions from '../../../store/actions/ui/ui.actions';
import { Router } from '@angular/router';

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
  animation$: Observable<string[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);
    this.areas$ = this.store.select(state => state.selectedOrganization.organizationAreas.areas);

    this.loading$ = this.store.select(state => state.selectedOrganization.organizationAreas.loading);
  }

  ngOnDestroy()
  {
    // this.store.dispatch(OrganizationAreasActions.clearState());
  }

}
