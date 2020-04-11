import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  user$: Observable<UserModel>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.user$ = this.store.select((state) => state.auth.user);
  }

  changeImage() {
    console.log("cambio de imagen");
  }
}
