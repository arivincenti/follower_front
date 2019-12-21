import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AreaModel } from 'src/app/models/area.model';
import { UserModel } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { AreasService } from 'src/app/services/areas/areas.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Router } from '@angular/router';
import * as AreasActions from '../../../store/actions/userOrganizations/selectedOrganization/areas/areas/areas.actions';
import { MatDialog } from '@angular/material';
import { AreaFormComponent } from '../area-form/area-form.component';
import { MemberModel } from 'src/app/models/member.model';

@Component({
  selector: 'app-areas-list-card',
  templateUrl: './areas-list-card.component.html',
  styleUrls: ['./areas-list-card.component.css']
})
export class AreasListCardComponent implements OnInit, OnDestroy
{

  @Input() organization: OrganizationModel;
  @Input() area: AreaModel;
  @Input() user: UserModel;

  membersSubscription: Subscription = new Subscription();
  members: MemberModel[];
  membersLoading: boolean = true;
  areasLoading$: Observable<boolean>;
  animations$: Observable<string[]>;

  constructor(
    private _areaService: AreasService,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit()
  {
    this.animations$ = this.store.select(state => state.ui.animated);

    this.areasLoading$ = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas.loading);

    this.membersSubscription = this._areaService.getAreaMembers(this.area._id).subscribe(members =>
    {
      this.members = members;
      this.membersLoading = false;
    });
  }

  ngOnDestroy()
  {
    this.membersSubscription.unsubscribe();
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

  setResponsibleMember(member: MemberModel)
  {
    let payload = {
      responsible: member,
      organization: this.organization._id,
      updated_by: this.user._id
    }
    this.store.dispatch(AreasActions.updateArea({ areaId: this.area._id, payload: payload }));
  }

  displayedColumns: string[] = ['responsable', 'miembro', 'tickets_pendientes', 'tickets_resueltos', 'tickets_despachados', 'tickets_totales'];

}
