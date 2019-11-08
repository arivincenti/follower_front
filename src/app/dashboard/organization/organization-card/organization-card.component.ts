import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { AreaModel } from 'src/app/models/area.model';
import { MemberModel } from 'src/app/models/member.model';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
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
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private _organizationService: OrganizationsService,
    private router: Router
  ) { }

  ngOnInit()
  {
    this.areas$ = this._organizationService.getOrganizationAreas(this.organization._id);

    this.members$ = this._organizationService.getOrganizationMembers(this.organization);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  selectOrganization(organization: OrganizationModel)
  {
    this.router.navigate(['app/organizations/profile', organization._id]);
  }

  deleteOrganization(organization: OrganizationModel)
  {
    console.log(organization);
  }

}
