import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchOrganizationMember"
})
export class SearchOrganizationMemberPipe implements PipeTransform {
  transform(value: any, search: any): any {
    if (search === "") {
      return [];
    }

    var members = [];

    for (let t = 0; t < value.length; t++) {
      let last_name: string = value[t].user.last_name.toLowerCase();
      let name: string = value[t].user.name.toLowerCase();
      let email: string = value[t].user.email.toLowerCase();

      let lcsearch = search.toLowerCase();
      if (
        last_name.startsWith(lcsearch) ||
        name.startsWith(lcsearch) ||
        email.startsWith(lcsearch)
      ) {
        members.push(value[t]);
      }
    }
    return members;
  }
}
