import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';
// import { moment } from 'moment-timezone';

@Pipe({
	name: 'time'
})
export class TimePipe implements PipeTransform {
	transform (value: any, ...args: any[]): any {
		moment.locale('es');
		return moment.tz(value, 'America/Argentina/Buenos_Aires').fromNow();
	}
}
