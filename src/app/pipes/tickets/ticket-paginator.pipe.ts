import { Pipe, PipeTransform } from '@angular/core';
import { TicketModel } from 'src/app/models/ticketModel';

@Pipe({
  name: 'ticketPaginator'
})
export class TicketPaginatorPipe implements PipeTransform {

  transform(tickets: TicketModel[], since: number, until: number): TicketModel []
  {
    return tickets.slice(since, until);
  }
}
