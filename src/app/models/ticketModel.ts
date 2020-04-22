import { MovementModel } from "./movementModel";
import { UserModel } from "./user.model";
import { AreaModel } from "./area.model";
import { MemberModel } from "./member.model";
import { CommentModel } from "./commentModel";

export class TicketModel {
  constructor(
    public _id: string,
    public area: AreaModel,
    public responsible: MemberModel,
    public followers: UserModel[],
    public comments: CommentModel[],
    public priority: string,
    public date: Date,
    public status: string,
    public subject: string,
    public issue: string,
    public movements: MovementModel[],
    public created_by?: UserModel,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date
  ) {}
}
