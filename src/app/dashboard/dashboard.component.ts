import { Component, OnInit, OnDestroy } from "@angular/core";
import { WebsocketService } from "../services/websocket/websocket.service";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { AreasService } from "../services/areas/areas.service";
import { takeUntil, filter } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private wsService: WebsocketService,
    private _areasService: AreasService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.wsService.cargarStorage();

    let auth = JSON.parse(localStorage.getItem("auth"));

    //Nos unimos a todas las salas de áreas
    this._areasService.getAreasByUser(auth.user).subscribe(areas => {
      this.wsService.emit("join-all-areas", areas);
    });
  }

  ngOnDestroy() {}
}
