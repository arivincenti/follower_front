import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit
{

  organizationModal$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.organizationModal$ = this.store.select(state => state.ui.organizationModal);
  }

}
