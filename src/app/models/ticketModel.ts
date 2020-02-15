import { MovementModel } from "./movementModel";
import { CommentModel } from "./commentModel";
import { UserModel } from "./user.model";
import { AreaModel } from "./area.model";
import { MemberModel } from "./member.model";

export class TicketModel {
  constructor(
    public _id: string,
    public area: AreaModel,
    public responsible: MemberModel[],
    public priority: string,
    public status: string,
    public subject: string,
    public issue: string,
    public movements: MovementModel[],
    public comments?: CommentModel[],
    public created_by?: UserModel,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date
  ) {}
}
