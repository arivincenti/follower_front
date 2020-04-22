import { Pipe, PipeTransform } from "@angular/core";
import { VirtualTimeScheduler } from "rxjs";

@Pipe({
  name: "firstUpperCase",
})
export class FirstUpperCasePipe implements PipeTransform {
  transform(value: string): any {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
