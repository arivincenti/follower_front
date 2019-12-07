import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { AreaModel } from 'src/app/models/area.model';
import { MemberModel } from 'src/app/models/member.model';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import * as OrganizationsActions from '../../../store/actions/userOrganizations/organizations/organizations.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

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
    private _organizationService: OrganizationsService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    //Estas consultas van directo sobre el servicio porque a esta altura de la aplicacion toidavia no se cargaron ls areas de una organizacion
    this.areas$ = this._organizationService.getOrganizationAreas(this.organization._id);
    this.members$ = this._organizationService.getOrganizationMembers(this.organization);

  }

  ngOnDestroy() { }

  selectOrganization(organization: OrganizationModel)
  {
    this.router.navigate(['app/organizations/profile', organization._id]);
  }

  updateOrganization(organization: OrganizationModel)
  {
    this.router.navigate(['app/organizations/form', this.organization._id]);
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
