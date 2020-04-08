import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchNotification",
})
export class SearchNotificationPipe implements PipeTransform {
  transform(value: any, search: string): any {
    if (search === "") {
      return value;
    }

    var notifications = [];

    for (let t = 0; t < value.length; t++) {
      console.log(value[t].object);
      let objectType: string = value[t].objectType.toLowerCase();
      let notificationTitle: string = value[t].notificationTitle.toLowerCase();
      let lcsearch = search.toLowerCase();

      if (
        objectType.startsWith(lcsearch) ||
        notificationTitle.startsWith(lcsearch)
      ) {
        notifications.push(value[t]);
      }
    }
    return notifications;
  }
}
