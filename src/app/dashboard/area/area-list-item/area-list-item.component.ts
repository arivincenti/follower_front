import { Component, OnInit, Input } from '@angular/core';
import { AreaModel } from 'src/app/models/area.model';
import { AreasService } from 'src/app/services/areas/areas.service';
import { MemberModel } from 'src/app/models/member.model';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';


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
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.organization$ = this.store.select(state => state.userOrganizations.organizationSelected.organization.organization);

    this.responsibleMembers$ = this._areaService.getAreaResponsibleMembers(this.area._id);
  }

  selectArea()
  {
    // redirigir a la pantalla de administracion del area
  }

}
