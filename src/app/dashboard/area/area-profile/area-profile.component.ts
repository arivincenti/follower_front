import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { MemberModel } from 'src/app/models/member.model';
import * as AreaActions from '../../../store/actions/userOrganizations/selectedOrganization/areas/area/area/area.actions';
import * as AreaMembersActions from '../../../store/actions/userOrganizations/selectedOrganization/areas/area/areaMembers/areaMembers.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-area-profile',
  templateUrl: './area-profile.component.html',
  styleUrls: ['./area-profile.component.css']
})
export class AreaProfileComponent implements OnInit, OnDestroy
{

  userSubscription: Subscription = new Subscription();
  paramSubscription: Subscription = new Subscription();
  membersSubscription: Subscription = new Subscription();
  areaSubscription: Subscription = new Subscription();

  animation$: Observable<string[]>;
  param:string;
  user: UserModel;
  members: MemberModel[];
  filterMembers: MemberModel[];
  area: AreaModel;
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
    this.param = this.activatedRoute.snapshot.paramMap.get('id');

    this.store.dispatch(AreaActions.getArea({ payload: this.param }));

    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user =>
    {
      this.user = user;
    });

    this.areaSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.areas.selectedArea.area.area).pipe(
      filter(area => area !== null)
    )
    .subscribe(area => {
      this.area = area;
      console.log(area);
      this.store.dispatch(AreaMembersActions.getAreaMembers({payload: area._id}));
    });
  
    this.organizationSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.organization.organization).subscribe(organization => this.organziation = organization);

    this.membersSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.areas.selectedArea.areaMembers.members).subscribe(members =>
    {
      this.members = members;
      this.filterMembers = members;
    });

  }

  ngOnDestroy()
  {
    this.organizationSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
    this.areaSubscription.unsubscribe();
  }

  backToLastPage()
  {
    this.router.navigate(['app/organizations/profile', this.organziation._id]);
  }

  newMember(area: AreaModel)
  {
    this.router.navigate(['app/organizations/members/form', area._id]);
  }

}
