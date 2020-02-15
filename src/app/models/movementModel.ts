import { AreaModel } from "./area.model";
import { MemberModel } from "./member.model";
import { UserModel } from "./user.model";

export class MovementModel {
  constructor(
    public _id: string,
    public area: AreaModel,
    public responsible: MemberModel[],
    public followers: UserModel[],
    public priority: string,
    public status: string,
    public created_at?: Date
  ) {}
}
