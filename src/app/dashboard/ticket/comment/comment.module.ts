import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentListComponent } from "./comment-list/comment-list.component";
import { CommentListCardComponent } from "./comment-list-card/comment-list-card.component";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { PipesModule } from "src/app/pipes/pipes.module";

@NgModule({
  declarations: [CommentListComponent, CommentListCardComponent],
  imports: [CommonModule, AngularMaterialModule, SharedModule, PipesModule],
  exports: [CommentListComponent, CommentListCardComponent]
})
export class CommentModule {}
