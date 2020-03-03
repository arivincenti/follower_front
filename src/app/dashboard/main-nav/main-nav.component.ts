import { Component, OnInit, OnDestroy } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import * as AuthActions from "../../store/actions/auth/auth.actions";
import * as UiActions from "../../store/actions/ui/ui.actions";
import { OverlayContainer } from "@angular/cdk/overlay";
import { WebsocketService } from "src/app/services/websocket/websocket.service";
import { NotificationModel } from "src/app/models/notificationModel";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.css"]
})
export class MainNavComponent implements OnInit, OnDestroy {
  user$: Observable<UserModel>;
  unreadNotifications$: Observable<NotificationModel[]>;
  theme$: Observable<string>;
  oldTheme: string;
  newTheme: string;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private overlayContainer: OverlayContainer,
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    public _wsService: WebsocketService
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(state => state.auth.user);

    this.unreadNotifications$ = this.store.select(
      state =>
        state.userOrganizations.notifications.unreadNotifications
          .unreadNotifications
    );

    this.theme$ = this.store
      .select(state => state.ui.theme)
      .pipe(
        map(theme => {
          this.newTheme = theme;

          this.overlayContainer
            .getContainerElement()
            .classList.remove(this.oldTheme);
          this.overlayContainer
            .getContainerElement()
            .classList.add(this.newTheme);

          this.oldTheme = this.newTheme;

          return theme;
        })
      );
  }

  ngOnDestroy() {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  changeTheme(color: string) {
    this.store.dispatch(UiActions.selectTheme({ payload: color }));
  }

  search() {
    console.log("buscando ticket");
  }
}
