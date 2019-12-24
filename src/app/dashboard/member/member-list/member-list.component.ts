import { Component, OnInit, Input } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { MemberModel } from 'src/app/models/member.model';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit
{
  @Input() organization: OrganizationModel;
  @Input() user: UserModel;
  @Input() members: MemberModel[];
  @Input() animation: string[];

  //Paginator variables
  pageIndex: number = 0;
  pageSize: number = 5;
  since: number;
  until: number;
  pageSizeOptions: number[] = [5, 10, 15, 20];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor() { }

  ngOnInit()
  {
    this.since = this.pageIndex;
    this.until = this.pageSize;
  }

  // ==================================================
  // Set paginator page size
  // ==================================================
  setPageSizeOptions(setPageSizeOptionsInput: string)
  {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  // ==================================================
  // Change Page
  // ==================================================
  changePage($event: PageEvent)
  {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;

    this.since = this.pageIndex * this.pageSize;

    if (this.pageIndex)
    {
      this.until = this.pageIndex * this.pageSize + this.pageSize;
    } else
    {
      this.until = this.pageSize;
    }
  }

}
