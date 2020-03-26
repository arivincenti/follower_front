import { Component, OnInit, Input } from "@angular/core";
import { CommentModel } from "src/app/models/commentModel";
import { UserModel } from "src/app/models/user.model";
import { PageEvent } from "@angular/material";

@Component({
  selector: "app-comment-list-card",
  templateUrl: "./comment-list-card.component.html",
  styleUrls: ["./comment-list-card.component.css"]
})
export class CommentListCardComponent implements OnInit {
  @Input() comment: CommentModel;
  @Input() user: UserModel;

  constructor() {}

  ngOnInit() {}
}
