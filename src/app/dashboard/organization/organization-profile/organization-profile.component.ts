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

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit, OnDestroy
{

  organizationSubscription: Subscription = new Subscription();
  paramSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  organization$: Observable<OrganizationModel>;
  userAreas$: Observable<AreaModel[]>
  user: UserModel;
  areas$: Observable<AreaModel[]>;
  animation$: Observable<string[]>;
  organization: OrganizationModel;


  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }


  ngOnInit()
  {
    // this.store.dispatch(AreasActions.clearSelectedAreaState());
    this.animation$ = this.store.select(state => state.ui.animated);

    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user =>
    {
      this.user = user;
    });

    this.paramSubscription = this.activatedRoute.params.subscribe(param =>
    {
      this.store.dispatch(OrganizationActions.getOrganization({ organization: param.id, user: this.user._id }));
    });

    this.organization$ = this.store.select(state => state.userOrganizations.selectedOrganization.organization.organization);

    this.organizationSubscription = this.organization$.subscribe(organization => this.organization = organization);

  }

  ngOnDestroy()
  {
    this.organizationSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }


  createArea(): void {
    this.dialog.open(AreaFormComponent, {
      width: '600px',
      data: {
        organization: this.organization,
        area: 'nueva'
      }
    });
  }

  createMember(): void {
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
