import { Component, OnInit, Input } from '@angular/core';
import { AreaModel } from 'src/app/models/area.model';
import { AreasService } from 'src/app/services/areas/areas.service';
import { MemberModel } from 'src/app/models/member.model';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

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

  constructor(
    private _areaService: AreasService
  ) { }

  ngOnInit()
  {
    this.responsibleMembers$ = this._areaService.getAreaResponsibleMembers(this.area._id);
  }

}
