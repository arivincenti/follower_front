import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { AreaModel } from 'src/app/models/area.model';
import { MemberModel } from 'src/app/models/member.model';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.css']
})
export class OrganizationCardComponent implements OnInit, OnDestroy
{

  @Input() organization: OrganizationModel;
  @Input() user: UserModel;
  areas$: Observable<AreaModel[]>;
  members$: Observable<MemberModel[]>


  constructor(
    private _organizationService: OrganizationsService,
    private router: Router
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
}
