import { Injectable } from '@angular/core';
import { MemberModel } from 'src/app/models/member.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService
{

  constructor(
    private http: HttpClient
  ) { }

  selectMember(member: MemberModel)
  {

  }

  createMember(member: any)
  {
    return this.http.post(`${environment.path}/members`, member).pipe(
      map(data => data['data'])
    )
  }

  updateMember(member: MemberModel)
  {
    return this.http.put(`${environment.path}/members/${member._id}`, member).pipe(
      map(data => {
        console.log(data['data']);
        return data['data']
      })
    )
  }
}
