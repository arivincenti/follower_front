import { Component, OnInit, Input } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit
{

  @Input() organization: OrganizationModel;

  constructor() { }

  ngOnInit()
  {
  }

}
