import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import * as OrganizationActions from '../../../store/actions/userOrganizations/selectedOrganization/organization.actions';
import { MatDialog } from '@angular/material';
import { AreaFormComponent } from '../../area/area-form/area-form.component';
import { MemberFormComponent } from '../../member/member-form/member-form.component';
import { MemberModel } from 'src/app/models/member.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit, OnDestroy
{
  //Subscriptions
  organizationSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();


  organization$: Observable<OrganizationModel>;
  organizationLoading$: Observable<boolean>;
  user: UserModel;
  animation$: Observable<string[]>;
  organization: OrganizationModel;

  //Filter & counter
  param: string;
  areas$: Observable<AreaModel[]>;
  areasLoading$: Observable<boolean>;
  areasLoaded$: Observable<boolean>;
  filterAreas: AreaModel[];
  memberAreas$: Observable<AreaModel[]>;
  memberAreasLoading$: Observable<boolean>;
  memberAreasLoaded$: Observable<boolean>;
  filterMemberAreas: AreaModel[];
  members$: Observable<MemberModel[]>;
  membersLoading$: Observable<boolean>;
  membersLoaded$: Observable<boolean>;
  filterMembers: MemberModel[];

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit()
  {

    this.animation$ = this.store.select(state => state.ui.animated);

    this.areasLoading$ = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas.loading);

    this.areasLoaded$ = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas.loaded);

    this.memberAreasLoading$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.memberAreas.loading);

    this.memberAreasLoaded$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.memberAreas.loaded);
    
    this.membersLoading$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.loading);

    this.membersLoaded$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.loaded);

    this.organizationLoading$ = this.store.select(state => state.userOrganizations.selectedOrganization.organization.loading);

    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user =>
    {
      this.user = user;
    });

    this.param = this.activatedRoute.snapshot.paramMap.get('id');

    this.store.dispatch(OrganizationActions.getOrganization({ organization: this.param, user: this.user._id }))

    this.organization$ = this.store.select(state => state.userOrganizations.selectedOrganization.organization.organization).pipe(map(organization => this.organization = organization));

    this.areas$ = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas.areas).pipe(map(areas => this.filterAreas = areas));

    this.memberAreas$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.memberAreas.areas).pipe(map(areas => this.filterMemberAreas = areas));

    this.members$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.members).pipe(map(members => this.filterMembers = members));

  }

  ngOnDestroy()
  {
    this.organizationSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }


  createArea(): void
  {
    this.dialog.open(AreaFormComponent, {
      width: '600px',
      data: {
        user: this.user,
        organization: this.organization,
        area: null
      }
    });
  }

  createMember(): void
  {
    this.dialog.open(MemberFormComponent, {
      width: '600px',
      data: {
        user: this.user,
        organization: this.organization
      }
    });
  }

  backToLastPage()
  {
    this.router.navigate(['app/organizations']);
  }

}
