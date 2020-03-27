import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "paginator"
})
export class PaginatorPipe implements PipeTransform {
  transform(value: any[], since: number, until: number): any[] {
    return value.slice(since, until);
  }
}
