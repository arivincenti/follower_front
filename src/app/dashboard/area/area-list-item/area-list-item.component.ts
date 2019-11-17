import { Component, OnInit, Input } from '@angular/core';
import { AreaModel } from 'src/app/models/area.model';
import { AreasService } from 'src/app/services/areas/areas.service';
import { MemberModel } from 'src/app/models/member.model';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Router } from '@angular/router';


@Component({
  selector: 'tr[app-area-list-item]',
  templateUrl: './area-list-item.component.html',
  styleUrls: ['./area-list-item.component.css']
})
export class AreaListItemComponent implements OnInit
{
  @Input() area: AreaModel;
  @Input() user: UserModel;
  responsibleMembers$: Observable<MemberModel[]>;
  organization$: Observable<OrganizationModel>;


  constructor(
    private _areaService: AreasService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit()
  {
    this.organization$ = this.store.select(state => state.selectedOrganization.organization.organization);

    this.responsibleMembers$ = this._areaService.getAreaResponsibleMembers(this.area._id);
  }

  selectArea(area: AreaModel)
  {
    // redirigir a la pantalla de administracion del area
    this.router.navigate(['app/organizations/areas/profile', area._id]);
  }

}
