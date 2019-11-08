import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Observable } from 'rxjs';
import { MemberModel } from 'src/app/models/member.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-organization-user-areas-list',
  templateUrl: './organization-user-areas-list.component.html',
  styleUrls: ['./organization-user-areas-list.component.css']
})
export class OrganizationUserAreasListComponent implements OnInit
{

  @Input() user: UserModel;
  @Input() organization: OrganizationModel;
  memberAreas$: Observable<MemberModel[]>;

  constructor(
    private _userService: UsersService
  ) { }

  ngOnInit()
  {
    this.memberAreas$ = this._userService.getUserOrganizationAreas(this.user._id, this.organization._id);
  }

}
