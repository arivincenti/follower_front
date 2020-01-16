import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(
    private http: HttpClient
  ) { }

  getTickets(user: UserModel){
    return this.http.get(`${environment.path}/tickets/user/${user._id}`);
  }
}
