import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";

import * as UserActions from "../../store/actions/auth/auth.actions";
import { Router } from "@angular/router";
import { logingIn } from "src/app/store/selectors/auth/auth.selector";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  private unsuscribe$ = new Subject();
  form: FormGroup;

  logingIn$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    localStorage.clear();

    this.logingIn$ = this.store.select(logingIn);

    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.unsubscribe();
  }

  login() {
    let email: string = this.form.controls.email.value;
    let password: string = this.form.controls.password.value;
    let credentials = {
      email: email.toUpperCase(),
      password: password.toUpperCase(),
    };
    this.store.dispatch(UserActions.login({ credentials }));
  }
}
