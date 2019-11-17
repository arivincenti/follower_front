import { Component, OnInit, Input } from '@angular/core';
import { MemberModel } from 'src/app/models/member.model';

@Component({
  selector: 'tr[app-area-members-list-item]',
  templateUrl: './area-members-list-item.component.html',
  styleUrls: ['./area-members-list-item.component.css']
})
export class AreaMembersListItemComponent implements OnInit {

  @Input() member: MemberModel;
  
  constructor() { }

  ngOnInit() {
  }

}
