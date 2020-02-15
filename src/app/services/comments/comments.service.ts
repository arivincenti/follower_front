import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CommentsService {
  constructor(private http: HttpClient) {}

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
    return this.http.put(
      `${environment.path}/comments/${payload.ticket}`,
      payload
    );
  }
}
