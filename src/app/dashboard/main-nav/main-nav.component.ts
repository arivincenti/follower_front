import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as AuthActions from '../../store/actions/auth/auth.actions';
import * as UiActions from '../../store/actions/ui/ui.actions';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit
{

  user$: Observable<UserModel>;
  theme$: Observable<string>;
  // tema: string = 'default';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {    
    this.user$ = this.store.select(state => state.auth.user);
    this.theme$ = this.store.select(state => state.ui.theme);
  }

  logout()
  {
    this.store.dispatch(AuthActions.logout());
  }

  changeTheme(color: string)
  {
    this.store.dispatch(UiActions.selectTheme({ payload: color }));
  }

}
