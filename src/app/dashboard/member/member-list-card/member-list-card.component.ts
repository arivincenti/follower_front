import { Component, OnInit, Input } from '@angular/core';
import { MemberModel } from 'src/app/models/member.model';
import { OrganizationModel } from 'src/app/models/organization.model';

@Component({
  selector: 'app-member-list-card',
  templateUrl: './member-list-card.component.html',
  styleUrls: ['./member-list-card.component.css']
})
export class MemberListCardComponent implements OnInit {

  @Input() organization: OrganizationModel;
  @Input() member: MemberModel;

  constructor() { }

  ngOnInit() {
  }

}
