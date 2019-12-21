import { Component, OnInit, Input } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';
import { AreaModel } from 'src/app/models/area.model';
import { UserModel } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { AreasService } from 'src/app/services/areas/areas.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Router } from '@angular/router';
import { MemberModel } from 'src/app/models/member.model';

@Component({
  selector: 'app-member-areas-list-card',
  templateUrl: './member-areas-list-card.component.html',
  styleUrls: ['./member-areas-list-card.component.css']
})
export class MemberAreasListCardComponent implements OnInit
{

  @Input() organization: OrganizationModel;
  @Input() area: AreaModel;
  @Input() user: UserModel;

  membersSubscription: Subscription = new Subscription();
  members: MemberModel[];
  membersLoading: boolean = true;
  animations$: Observable<string[]>;


  constructor(
    private _areaService: AreasService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit()
  {

    this.animations$ = this.store.select(state => state.ui.animated);
    
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

  displayedColumns: string[] = ['nombre', 'apellido', 'tickets_pendientes', 'tickets_resueltos', 'tickets_despachados', 'tickets_totales'];

}
