import { Component, OnInit, OnDestroy } from "@angular/core";
import { WebsocketService } from "../services/websocket/websocket.service";
import { Subscription } from "rxjs";
import { OrganizationsService } from "../services/organizations/organizations.service";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    this.wsService.cargarStorage();
  }

  ngOnDestroy() {}
}
