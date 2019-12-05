import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AreaModel } from 'src/app/models/area.model';
import { UserModel } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { MemberModel } from 'src/app/models/member.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { AreasService } from 'src/app/services/areas/areas.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Router } from '@angular/router';
import * as OrganizationAreasActions from '../../../store/actions/userOrganizations/selectedOrganization/organizationAreas.actions';

@Component({
  selector: 'tr[app-organization-areas-list-items]',
  templateUrl: './organization-areas-list-items.component.html',
  styleUrls: ['./organization-areas-list-items.component.css']
})
export class OrganizationAreasListItemsComponent implements OnInit, OnDestroy
{

  @Input() area: AreaModel;
  @Input() user: UserModel;
  responsibleMembers$: Observable<MemberModel[]>;
  organization$: Observable<OrganizationModel>;
  subscriptionAreaMembers: Subscription = new Subscription();
  areaMembers: number;

  constructor(
    private _areaService: AreasService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit()
  {
    this.organization$ = this.store.select(state => state.userOrganizations.selectedOrganization.organization.organization);

    this.responsibleMembers$ = this._areaService.getAreaResponsibleMembers(this.area._id);

    this.subscriptionAreaMembers = this._areaService.getAreaMembers(this.area._id).subscribe(members =>
    {
      if (members)
      {
        this.areaMembers = members.length;
      } else
      {
        this.areaMembers = 0;
      }
    });
  }

  ngOnDestroy()
  {
    this.subscriptionAreaMembers.unsubscribe();
  }

  selectArea(area: AreaModel)
  {
    //Redirect to Area Profile
    this.router.navigate(['app/organizations/areas/profile', area._id]);
  }

  updateArea(area: AreaModel)
  {
    //Redirect to Area form
    this.router.navigate(['app/organizations/areas/form', area._id]);
  }

  deleteArea(area: AreaModel)
  {
    //Make method to update deleted_at property from area
    this.store.dispatch(OrganizationAreasActions.deleteOrganizationArea({ payload: area._id }));
  }

  activateArea(area: AreaModel)
  {
    let payload = {
      deleted_at: 1
    }

    this.store.dispatch(OrganizationAreasActions.updateOrganizationArea({ areaId: area._id, payload: payload }));
  }

}
