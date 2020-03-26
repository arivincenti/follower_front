import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchArea"
})
export class SearchAreaPipe implements PipeTransform {
  transform(value: any, search: string): any {
    if (search === "") {
      return value;
    }

    var areas = [];

    for (let t = 0; t < value.length; t++) {
      let name: string = value[t].name.toLowerCase();
      let lcsearch = search.toLowerCase();
      if (name.startsWith(lcsearch)) {
        areas.push(value[t]);
      }
    }
    return areas;
  }
}
