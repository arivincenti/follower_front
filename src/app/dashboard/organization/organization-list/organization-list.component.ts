import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit
{
  @Input() organizations: OrganizationModel[];
  @Input() user: UserModel;

      //Paginator variables
      pageIndex: number = 0;
      pageSize: number = 3;
      since: number;
      until: number;
      pageSizeOptions: number[] = [3, 10, 15, 20];
    
      // MatPaginator Output
      pageEvent: PageEvent;

  //UI Observables
  animation$: Observable<string[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);
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
