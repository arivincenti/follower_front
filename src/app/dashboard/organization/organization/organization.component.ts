import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as OrganizationActions from '../../../store/actions/organizations/organization.actions';
import * as AreasActions from '../../../store/actions/areas/areas.actions';
import { AreaModel } from 'src/app/models/area.model';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy
{

  paramSubscription: Subscription = new Subscription();
  loadingSubscription: Subscription = new Subscription();
  organization$: Observable<OrganizationModel>;
  user$: Observable<UserModel>;
  areas$: Observable<AreaModel[]>;
  error$: Observable<string>;
  loading: boolean;

  constructor(
    private store: Store<AppState>,
    private actiavtedRoute: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.user$ = this.store.select(state => state.auth.user);

    let organization_id;

    this.paramSubscription = this.actiavtedRoute.params.subscribe(param =>
    {
      organization_id = param.id
    });

    this.store.dispatch(OrganizationActions.getOrganization({ payload: organization_id }));
    this.organization$ = this.store.select(state => state.organization.organization);

    this.store.dispatch(AreasActions.getOrganizationAreas({ payload: organization_id }));
    this.areas$ = this.store.select(state => state.areas.areas);

    this.loadingSubscription = this.store.select(state => state.areas.loading).subscribe(loading => this.loading = loading);

    this.error$ = this.store.select(state => state.areas.error);
  }

  ngOnDestroy()
  {
    this.paramSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.store.dispatch(OrganizationActions.clearState());
    this.store.dispatch(AreasActions.clearState());
  }

}
