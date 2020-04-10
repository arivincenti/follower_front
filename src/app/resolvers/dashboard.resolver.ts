import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { Observable, Subscription } from "rxjs";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";
import { user } from "../store/selectors/auth/auth.selector";

@Injectable({
  providedIn: "root",
})
export class DashboardResolver implements Resolve<UserModel> {
  subscription$: Subscription = new Subscription();
  user: UserModel;
  constructor(private store: Store<AppState>) {
    this.subscription$ = this.store.select(user).subscribe((user) => {
      console.log(user);
      return (this.user = user);
    });
    this.subscription$.unsubscribe();
  }
  resolve() {
    return this.user;
  }
}
