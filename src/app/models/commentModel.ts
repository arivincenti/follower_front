import { AreaModel } from "./area.model";
import { UserModel } from "./user.model";
import { TicketModel } from "./ticketModel";

export class CommentModel {
  constructor(
    public _id: string,
    public ticket: TicketModel,
    public message: string,
    public type: string,
    public created_by: UserModel,
    public created_at?: Date
  ) {}
}
