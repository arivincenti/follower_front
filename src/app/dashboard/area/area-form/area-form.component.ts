import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as OrganizationActions from '../../../store/actions/organizations/organization.actions';
import { AreasService } from 'src/app/services/areas/areas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit
{

  //UI Observable
  animation$: Observable<string[]>;

  paramSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  userOrganizationSubscription: Subscription = new Subscription();
  organizationAreasSubscription: Subscription = new Subscription();
  user: UserModel;
  organization: OrganizationModel;
  areaName: string = '';
  avaible: boolean = true;
  organizationAreas: AreaModel[];
  area: AreaModel;
  param: string;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _areasService: AreasService,
    private _organizationService: OrganizationsService
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);

    //Params subscription
    this.paramSubscription = this.activatedRoute.params.subscribe(param =>
    {
      this.param = param.id;
    });

    //User Subscription    
    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user => this.user = user);

    //User selected organization subscription
    this.userOrganizationSubscription = this.store.select(state => state.selectedOrganization.organization.organization).subscribe(organization => this.organization = organization);

    //Search organizations areas
    this.organizationAreasSubscription = this.store.select(state => state.selectedOrganization.organizationAreas.areas).subscribe(areas => this.organizationAreas = areas);

    //Check if param is not a new area, then search it
    if (this.param !== 'nueva')
    {
      this._areasService.getselectedArea(this.param).subscribe((area: AreaModel) =>
      {
        this.area = area;
        this.areaName = area.name;
        this.validateName();
      })
    }
  }

  ngOnDestroy()
  {
    this.paramSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.userOrganizationSubscription.unsubscribe();
    this.organizationAreasSubscription.unsubscribe();
  }

  // ==================================================
  // Create a new Area or Update one
  // ==================================================
  createArea()
  {

    if (!this.avaible || !this.areaName) return;

    if (this.param === 'nueva')
    {
      let payload = {
        user: this.user._id,
        organization: this.organization._id,
        name: this.areaName.toUpperCase()
      }

      this.store.dispatch(OrganizationActions.createOrganizationArea({ payload }));
      
    } else
    {
      let payload = {
        name: this.areaName.toUpperCase()
      }

      this.store.dispatch(OrganizationActions.updateOrganizationArea({ areaId: this.area._id, payload: payload }));

      this.router.navigate(['app/organizations/profile', this.organization._id]);
    }

  }

  // ==================================================
  // Back to last page
  // ==================================================
  backToLastPage()
  {
    this.router.navigate(['app/organizations/profile', this.organization._id]);
  }

  // ==================================================
  // Area name validator
  // ==================================================
  validateName()
  {
    this.avaible = true;
    this.organizationAreas.forEach(area =>
    {
      if (area.name.toUpperCase() === this.areaName.toUpperCase())
      {
        this.avaible = false;
      }
    });
  }

}
