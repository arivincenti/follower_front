import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AreaModel } from 'src/app/models/area.model';
import { UserModel } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { AreasService } from 'src/app/services/areas/areas.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Router } from '@angular/router';
import * as AreasActions from '../../../store/actions/userOrganizations/selectedOrganization/areas/areas.actions';
import { MatDialog } from '@angular/material';
import { AreaFormComponent } from '../area-form/area-form.component';

@Component({
  selector: 'app-areas-list-card',
  templateUrl: './areas-list-card.component.html',
  styleUrls: ['./areas-list-card.component.css']
})
export class AreasListCardComponent implements OnInit, OnDestroy {

  @Input() organization: OrganizationModel;
  @Input() area: AreaModel;
  @Input() user: UserModel;

  organization$: Observable<OrganizationModel>;
  subscriptionAreaMembers: Subscription = new Subscription();
  members: number;

  constructor(
    private _areaService: AreasService,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    
    this.organization$ = this.store.select(state => state.userOrganizations.selectedOrganization.organization.organization);

    this.subscriptionAreaMembers = this._areaService.getAreaMembers(this.area._id).subscribe(members =>
    {
      if (members)
      {
        this.members = members.length;
      } else
      {
        this.members = 0;
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
    this.dialog.open(AreaFormComponent, {
      width: '600px',
      data: {
        user: this.user,
        organization: this.organization,
        area: area._id
      }
    });
  }

  deleteArea(area: AreaModel)
  {
    let payload = {
      area: area._id,
      organization: this.organization._id,
      updated_by: this.user._id
    }
    //Make method to update deleted_at property from area
    this.store.dispatch(AreasActions.deleteArea({ payload: payload }));
  }

  activateArea(area: AreaModel)
  {
    let payload = {
      deleted_at: 1,
      organization: this.organization._id,
      updated_by: this.user._id
    }

    this.store.dispatch(AreasActions.updateArea({ areaId: area._id, payload: payload }));
  }

}
