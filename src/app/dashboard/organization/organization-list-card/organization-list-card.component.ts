import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { AreaModel } from 'src/app/models/area.model';
import { MemberModel } from 'src/app/models/member.model';
import * as OrganizationsActions from '../../../store/actions/userOrganizations/organizations/organizations.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { AreasService } from 'src/app/services/areas/areas.service';
import { MembersService } from 'src/app/services/members/members.service';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-organization-list-card',
  templateUrl: './organization-list-card.component.html',
  styleUrls: ['./organization-list-card.component.css']
})
export class OrganizationListCardComponent implements OnInit, OnDestroy
{

  @Input() organization: OrganizationModel;
  @Input() user: UserModel;
  areas$: Observable<AreaModel[]>;
  members$: Observable<MemberModel[]>


  constructor(
    private _membersService: MembersService,
    private _areasService: AreasService,
    private router: Router,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit()
  {
    //Estas consultas van directo sobre el servicio porque a esta altura de la aplicacion toidavia no se cargaron ls areas de una organizacion
    this.areas$ = this._areasService.getAreas(this.organization);
    this.members$ = this._membersService.getMembers(this.organization);

  }

  ngOnDestroy() { }

  selectOrganization(organization: OrganizationModel)
  {
    this.router.navigate(['app/organizations/profile', organization._id]);
  }

  updateOrganization(organization: OrganizationModel): void
  {
    this.dialog.open(OrganizationFormComponent, {
      width: '600px',
      data: {
        organization: organization._id,
      }
    });
  }

  deleteOrganization(organization: OrganizationModel)
  {
    this.store.dispatch(OrganizationsActions.deleteOrganization({ organization: organization._id }));
  }

  reactivateOrganization(organization: OrganizationModel)
  {
    let payload = {
      deleted_at: 1
    };

    this.store.dispatch(OrganizationsActions.updateOrganization({ organizationId: organization._id, payload: payload }));
  }
}
