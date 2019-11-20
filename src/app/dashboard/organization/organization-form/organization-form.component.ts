import { Component, OnInit, OnDestroy } from '@angular/core';
import * as OrganizationsActions from '../../../store/actions/organizations/organizations.actions';
import { Subscription, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css']
})
export class OrganizationFormComponent implements OnInit, OnDestroy
{
  //UI Observable
  animation$: Observable<string[]>;

  paramSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  userOrganizationsSubscription: Subscription = new Subscription();
  param: string;
  user: UserModel;
  organizationName: string;
  avaible: boolean = true;
  userOrganizations: OrganizationModel[];

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _organizationsService: OrganizationsService
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);

    //Params subscription
    this.paramSubscription = this.activatedRoute.params.subscribe(param =>
    {
      this.param = param.id;
    });


    //User subscription
    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user => this.user = user);

    //User organizations subscription
    this.userOrganizationsSubscription = this.store.select(state => state.userOrganizations.organizations).subscribe(organizations => this.userOrganizations = organizations);

    //Check if param is not a new organization, then search it
    if (this.param !== 'nueva')
    {
      this._organizationsService.getOrganization(this.param).subscribe((organization: OrganizationModel) =>
      {
        this.organizationName = organization.name;
        this.validateName();
      })
    }
  }

  ngOnDestroy()
  {
    console.log('modal destruido');
    this.userSubscription.unsubscribe();
    this.userOrganizationsSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }

  // ==================================================
  // Create o Update an organizations depends of params
  // ==================================================
  createOrUpdateOrganization()
  {
    //Validation name before create or update an organization
    if (!this.avaible || !this.organizationName) return;

    if (this.param === 'nueva')
    {
      let payload = {
        user: this.user._id,
        name: this.organizationName.toUpperCase()
      }

      this.store.dispatch(OrganizationsActions.createOrganization({ payload }));
      this.router.navigate(['app/organizations']);
    } else
    {
      let payload = {
        name: this.organizationName.toUpperCase()
      }
      this.store.dispatch(OrganizationsActions.updateOrganization({ organizationId: this.param, payload: payload }));
      this.router.navigate(['app/organizations']);
    }
  }

  backToLastPage(){
    this.router.navigate(['app/organizations']);
  }

  // ==================================================
  // Organization Name Validator
  // ==================================================
  validateName()
  {
    this.avaible = true;
    this.userOrganizations.forEach(organization =>
    {
      if (organization.name.toUpperCase() === this.organizationName.toUpperCase()) this.avaible = false;
    });
  }
}
