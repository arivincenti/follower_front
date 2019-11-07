import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as AuthActions from '../../store/actions/auth/auth.actions';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy
{
  
  constructor(
    private store: Store<AppState>,
    private router: Router
    ) { }

  ngOnInit()
  {

  }

  ngOnDestroy(){

  }

  logout()
  {
    this.store.dispatch(AuthActions.logout());
  }

}
