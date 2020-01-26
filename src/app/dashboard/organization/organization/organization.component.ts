import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as OrganizationsActions from '../../../store/actions/userOrganizations/organizations/organizations.actions';
import * as TicketsActions from '../../../store/actions/userOrganizations/tickets/userTickets/userTickets.actions';
import { OrganizationModel } from 'src/app/models/organization.model';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { filter } from 'rxjs/operators';
import { TicketModel } from 'src/app/models/ticketModel';
import { TicketFormComponent } from '../../ticket/ticket-form/ticket-form.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy
{
  userSubscription: Subscription = new Subscription();
  
  organizations$: Observable<OrganizationModel[]>;
  organizationsLoading$: Observable<boolean>;
  organizationsLoaded$: Observable<boolean>;


  tickets$: Observable<TicketModel[]>;
  ticketsLoading$: Observable<boolean>;
  ticketsLoaded$: Observable<boolean>;
  user: UserModel;

  //UI Observable
  animation$: Observable<string[]>;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit()
  {

    this.animation$ = this.store.select(state => state.ui.animated);

    this.userSubscription = this.store.select(state => state.auth.user)
      .pipe(filter(user => user !== null))
      .subscribe(user =>
      {
        this.user = user;
        this.store.dispatch(OrganizationsActions.getOrganizations({ payload: this.user._id }));
        this.store.dispatch(TicketsActions.getTickets({ payload: this.user }));
      });


    this.organizationsLoading$ = this.store.select(state => state.userOrganizations.organizations.loading);

    this.organizationsLoaded$ = this.store.select(state => state.userOrganizations.organizations.loaded);


    this.organizations$ = this.store.select(state => state.userOrganizations.organizations.organizations);

    this.ticketsLoading$ = this.store.select(state => state.userOrganizations.tickets.userTickets.loading);

    this.ticketsLoaded$ = this.store.select(state => state.userOrganizations.tickets.userTickets.loaded);

    this.tickets$ = this.store.select(state => state.userOrganizations.tickets.userTickets.tickets);

  }

  createOrganization(): void
  {
    this.dialog.open(OrganizationFormComponent, {
      width: '600px',
      data: {
        organization: null,
        user: this.user
      }
    });
  }

  createTicket(): void
  {
    this.dialog.open(TicketFormComponent, {
      panelClass: ['ticket-dialog'],
      data: {
        organization: null,
        user: this.user
      }
    });
  }

  ngOnDestroy()
  {
    //Nos desuscribimos del store cuando el componente se destruya
    this.userSubscription.unsubscribe();
  }

}
