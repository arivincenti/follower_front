import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { WebsocketService } from "../websocket/websocket.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CommentsService {
  constructor(private http: HttpClient, private wsService: WebsocketService) {}

  // ==================================================
  // get comments
  // ==================================================
  getComments(payload: string) {
    return this.http.get(`${environment.path}/comments/${payload}`);
  }

  // ==================================================
  // Add comment
  // ==================================================
  addComment(payload: any) {
    return this.http
      .post(`${environment.path}/comments`, payload)
      .pipe(map((res: any) => res.data));
  }

  listenCommentsSocket() {
    return this.wsService.listen("new-comment");
  }
}
