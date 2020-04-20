import { Pipe, PipeTransform } from "@angular/core";
import { UserModel } from "src/app/models/user.model";

@Pipe({
  name: "ticketFollower",
})
export class TicketFollowerPipe implements PipeTransform {
  transform(value: any, user: UserModel): any {
    let follower = value.followers.find(
      (follower) => follower._id === user._id
    );
    return follower !== undefined ? true : false;
  }
}
