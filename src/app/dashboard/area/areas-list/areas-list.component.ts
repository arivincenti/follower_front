import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { PageEvent, MatPaginator } from '@angular/material';
import * as AreasActions from '../../../store/actions/userOrganizations/selectedOrganization/areas/areas.actions';
import { AreasService } from 'src/app/services/areas/areas.service';
import { MemberModel } from 'src/app/models/member.model';

@Component({
  selector: 'app-areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.css']
})
export class AreasListComponent implements OnInit, OnDestroy
{

  @Input() organization: OrganizationModel;
  @Input() user: UserModel;
  @Input() areas: AreaModel[];
  loading$: Observable<boolean>;
  animation$: Observable<string[]>;

  areas$: Observable<AreaModel[]>;
  pageIndex: number = 0;
  pageSize: number = 3;
  desde: number;
  hasta: number;
  pageSizeOptions: number[] = [3, 6, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.hasta = this.pageSize;

    this.animation$ = this.store.select(state => state.ui.animated);

    this.loading$ = this.store.select(state => state.userOrganizations.selectedOrganization.areas.loading);

  }


  setPageSizeOptions(setPageSizeOptionsInput: string)
  {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  changePage($event: PageEvent)
  {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;

    this.desde = this.pageIndex * this.pageSize;

    if (this.pageIndex)
    {
      this.hasta = this.pageIndex * this.pageSize + this.pageSize;
    } else
    {
      this.hasta = this.pageSize;
    };

  }

  ngOnDestroy()
  {
    // this.store.dispatch(OrganizationAreasActions.clearState());
  }

}
