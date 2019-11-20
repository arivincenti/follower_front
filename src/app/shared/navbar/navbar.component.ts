import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as UiActions from '../../store/actions/ui/ui.actions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy
{
  user: UserModel;
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit()
  {
    this.subscription = this.store.select(state => state.auth.user).subscribe(user =>
    {
      this.user = user;
    })
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
