import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import * as OrganizationActions from '../../../store/actions/userOrganizations/selectedOrganization/organization.actions';
import * as MemberActions from '../../../store/actions/userOrganizations/selectedOrganization/members/member.actions';
import { MatDialog } from '@angular/material';
import { AreaFormComponent } from '../../area/area-form/area-form.component';
import { MemberFormComponent } from '../../member/member-form/member-form.component';
import { MemberModel } from 'src/app/models/member.model';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit, OnDestroy
{
  //Subscriptions
  organizationSubscription: Subscription = new Subscription();
  paramSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  areasSubscription: Subscription = new Subscription();
  membersSubscription: Subscription = new Subscription();

  organization$: Observable<OrganizationModel>;
  user: UserModel;
  animation$: Observable<string[]>;
  organization: OrganizationModel;

  //Filter & counter
  areas: AreaModel[];
  filterAreas: AreaModel[];
  members: MemberModel[];
  filterMembers: MemberModel[];
  userAreas$: Observable<AreaModel[]>;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);

    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user =>
    {
      this.user = user;
    });

    this.paramSubscription = this.activatedRoute.params.subscribe(param =>
    {
      this.store.dispatch(OrganizationActions.getOrganization({ organization: param.id, user: this.user._id }))
    });

    this.organization$ = this.store.select(state => state.userOrganizations.selectedOrganization.organization.organization);

    this.organizationSubscription = this.organization$.subscribe(organization =>
    {
      this.organization = organization;
    });

    this.areasSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas).subscribe(areas =>
    {
      this.areas = areas;
      this.filterAreas = areas;
    });

    this.userAreas$ = this.store.select(state => state.userOrganizations.selectedOrganization.userAreas.areas);

    this.membersSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.members).subscribe(members =>
    {
      this.members = members;
      this.filterMembers = members;
    });

    //Limpiamos el store un escalon por encima
    this.store.dispatch(MemberActions.clearSelectedMemberState());
  }

  ngOnDestroy()
  {
    this.organizationSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.areasSubscription.unsubscribe();
    this.membersSubscription.unsubscribe();
  }


  createArea(): void
  {
    this.dialog.open(AreaFormComponent, {
      width: '600px',
      data: {
        organization: this.organization,
        area: 'nueva'
      }
    });
  }

  createMember(): void
  {
    this.dialog.open(MemberFormComponent, {
      width: '600px',
      data: {
        organization: this.organization
      }
    });
  }

  backToLastPage()
  {
    this.router.navigate(['app/organizations']);
  }

}
