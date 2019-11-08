import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { MemberModel } from 'src/app/models/member.model';
import { UserModel } from 'src/app/models/user.model';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ActivatedRoute } from '@angular/router';
import * as OrganizationActions from '../../../store/actions/organizations/organization.actions';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit, OnDestroy {

  paramSubscription: Subscription = new Subscription();
  organization$: Observable<OrganizationModel>;
  userAreas$: Observable<MemberModel[]>
  user$: Observable<UserModel>;
  areas$: Observable<AreaModel[]>;


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

  }

  ngOnDestroy()
  {
    this.paramSubscription.unsubscribe();
    this.store.dispatch(OrganizationActions.clearState());
  }

}
