import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

import * as UserActions from '../../store/actions/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit
{

  cargando: boolean;
  error: string;
  subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit()
  {
    localStorage.clear();
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  login(form: NgForm)
  {
    var credentials = form.value;
    this.store.dispatch(UserActions.login({ credentials }));
    this.subscription = this.store.select('auth')
      .subscribe(auth =>
      {
        this.cargando = auth.loading;
        if (auth.error) this.error = auth.error.message;
        if (auth.user && auth.user.email === credentials.email) this.router.navigate(['app']);
      });
  }
}
