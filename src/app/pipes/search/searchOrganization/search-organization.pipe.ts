import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchOrganization"
})
export class SearchOrganizationPipe implements PipeTransform {
  transform(value: any, search: string): any {
    if (search === "") {
      return value;
    }

    var organizations = [];

    for (let t = 0; t < value.length; t++) {
      let name: string = value[t].name.toLowerCase();
      let lcsearch = search.toLowerCase();

      if (name.startsWith(lcsearch)) {
        organizations.push(value[t]);
      }
    }
    return organizations;
  }
}
