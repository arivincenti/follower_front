import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketListCardComponent } from './ticket-list-card/ticket-list-card.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketComponent } from './ticket/ticket.component';



@NgModule({
  declarations: [
    TicketListComponent,
    TicketListCardComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule
  ],
  exports: [
    TicketListComponent,
    TicketListCardComponent
  ]
})
export class TicketModule { }
