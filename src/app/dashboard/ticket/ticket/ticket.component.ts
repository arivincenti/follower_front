import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TicketModel } from 'src/app/models/ticketModel';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as TicketActions from '../../../store/actions/userOrganizations/tickets/ticket/ticket.actions';
import { MemberModel } from 'src/app/models/member.model';
import { AreasService } from 'src/app/services/areas/areas.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-ticket',
	templateUrl: './ticket.component.html',
	styleUrls: [ './ticket.component.css' ]
})
export class TicketComponent implements OnInit, OnDestroy {
	ticketSubscription: Subscription = new Subscription();
	messageForm: FormGroup;
	messageTypes: any[] = [ { value: 'PÚBLICO', checked: true }, { value: 'NOTA', checked: false } ];
	priorities: string[] = [ 'BAJA', 'MEDIA', 'ALTA' ];
	formControlMembers: FormControl;
	formControlPrority: FormControl;
	members$: Observable<MemberModel>;
	param: string;
	ticket$: Observable<TicketModel>;
	ticket: TicketModel;
	ticketLoading$: Observable<boolean>;
	ticketLoaded$: Observable<boolean>;

	constructor (
		private activatedRoute: ActivatedRoute,
		private store: Store<AppState>,
		private _areasService: AreasService
	) {}

	ngOnInit () {
		this.messageForm = new FormGroup({
			message: new FormControl(null, Validators.required),
			type: new FormControl(this.messageTypes[0].value)
		});

		this.param = this.activatedRoute.snapshot.paramMap.get('id');

		this.store.dispatch(TicketActions.getTicket({ payload: this.param }));

		this.ticketLoading$ = this.store.select(
			(state) => state.userOrganizations.tickets.selectedTicket.loading
		);

		this.ticketLoaded$ = this.store.select(
			(state) => state.userOrganizations.tickets.selectedTicket.loaded
		);

		this.ticket$ = this.store.select((state) => state.userOrganizations.tickets.selectedTicket.ticket).pipe(
			map((ticket) => {
				let members: string[] = [];

				this.members$ = this._areasService.getAreaMembers(
					ticket.movements[ticket.movements.length - 1].area._id
				);

				return ticket;
			})
		);

		this.ticketSubscription = this.ticket$.subscribe((ticket) => {
			let members: string[] = [];
			ticket.movements[ticket.movements.length - 1].responsible.forEach((member) => {
				members.push(member._id);
			});

			this.formControlMembers = new FormControl(members);
			this.formControlPrority = new FormControl(
				ticket.movements[ticket.movements.length - 1].priority
			);
		});
	}

	ngOnDestroy () {
		this.ticketSubscription.unsubscribe();
	}

	sendMessage () {
		console.log(this.messageForm.value);
	}

	saveChanges () {
		console.log(this.formControlMembers.value);
	}
}
