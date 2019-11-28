import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as AuthActions from '../../store/actions/auth/auth.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy
{
  user$: Observable<UserModel>;

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit()
  {
    this.user$ = this.store.select(state => state.auth.user);
  }

  ngOnDestroy()
  {
  }

  logout()
  {
    this.store.dispatch(AuthActions.logout());
  }

}
