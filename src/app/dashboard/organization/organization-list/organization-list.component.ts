import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit
{
  @Input() organizations: OrganizationModel[];
  @Input() user: UserModel;

  //UI Observables
  animation$: Observable<string[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);
  }

}
