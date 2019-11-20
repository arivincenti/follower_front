import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Router, ActivatedRoute } from '@angular/router';
import * as AreasActions from '../../../store/actions/areas/areas.actions';

@Component({
  selector: 'app-area-profile',
  templateUrl: './area-profile.component.html',
  styleUrls: ['./area-profile.component.css']
})
export class AreaProfileComponent implements OnInit, OnDestroy
{

  paramSubscription: Subscription = new Subscription();
  animation$: Observable<string[]>;
  area$: Observable<AreaModel>;
  areaLoading$: Observable<boolean>;
  organizationSubscription: Subscription = new Subscription();
  organziation: OrganizationModel;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);

    this.paramSubscription = this.activatedRoute.params.subscribe(param =>
    {
      this.store.dispatch(AreasActions.getArea({ payload: param.id }));
      this.store.dispatch(AreasActions.getAreaMembers({ payload: param.id }));
    });

    this.area$ = this.store.select(state => state.selectedArea.selectedArea.area);
    this.areaLoading$ = this.store.select(state => state.selectedArea.selectedArea.loading);


    this.organizationSubscription = this.store.select(state => state.selectedOrganization.organization.organization).subscribe(organization => this.organziation = organization);
  }

  ngOnDestroy()
  {
    this.organizationSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }

  backToLastPage()
  {
    this.router.navigate(['app/organizations/profile', this.organziation._id]);
  }

}
