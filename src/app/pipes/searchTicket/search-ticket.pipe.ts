import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchTicket"
})
export class SearchTicketPipe implements PipeTransform {
  transform(value: any, search: string): any {
    if (search === "") {
      return value;
    }

    var tickets = [];

    for (let t = 0; t < value.length; t++) {
      let subject: string = value[t].subject.toLowerCase();
      let status: string = value[t].status.toLowerCase();

      if (subject.startsWith(search) || status.startsWith(search)) {
        tickets.push(value[t]);
      }
    }
    return tickets;
  }
}
