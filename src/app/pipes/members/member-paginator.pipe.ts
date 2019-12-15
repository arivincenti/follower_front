import { Pipe, PipeTransform } from '@angular/core';
import { MemberModel } from 'src/app/models/member.model';

@Pipe({
  name: 'memberPaginator'
})
export class MemberPaginatorPipe implements PipeTransform {

  transform(members: MemberModel[], since: number, until: number): MemberModel[]
  {
    return members.slice(since, until);
  }

}
