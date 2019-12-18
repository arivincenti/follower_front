import { Component, OnInit, Input } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';
import { AreaModel } from 'src/app/models/area.model';
import { UserModel } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { AreasService } from 'src/app/services/areas/areas.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-areas-list-card',
  templateUrl: './member-areas-list-card.component.html',
  styleUrls: ['./member-areas-list-card.component.css']
})
export class MemberAreasListCardComponent implements OnInit {

  @Input() organization: OrganizationModel;
  @Input() area: AreaModel;
  @Input() user: UserModel;

  organization$: Observable<OrganizationModel>;
  subscriptionAreaMembers: Subscription = new Subscription();
  members: number;

  constructor(
    private _areaService: AreasService,
    private store: Store<AppState>,
    private router: Router
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

}
