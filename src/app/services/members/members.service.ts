import { Injectable } from '@angular/core';
import { MemberModel } from 'src/app/models/member.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { OrganizationModel } from 'src/app/models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService
{

  constructor(
    private http: HttpClient
  ) { }


  getMembers(organization: OrganizationModel)
  {
    return this.http.get(`${environment.path}/members/organization/${organization._id}`).pipe(
      map((data: any) => data.data)
    )
  }

  getMember(memberId: string)
  {
    return this.http.get(`${environment.path}/members/${memberId}`).pipe(
      map((data: any) => data.data)
    )
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
      map(data =>
      {
        console.log(data['data']);
        return data['data']
      })
    )
  }

  deleteMember(member: MemberModel)
  {
    return this.http.delete(`${environment.path}/members/${member._id}`).pipe(
      map(data =>
      {
        console.log(data['data']);
        return data['data']
      })
    )
  }

}
