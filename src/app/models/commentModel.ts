import { AreaModel } from './area.model';
import { UserModel } from './user.model';

export class CommentModel
{
  constructor(
    public _id: string,
    public created_by: UserModel,
    public type: string,
    public created_at?: Date
    ) { }
}