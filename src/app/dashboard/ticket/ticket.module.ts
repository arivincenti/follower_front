import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketListCardComponent } from './ticket-list-card/ticket-list-card.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';



@NgModule({
  declarations: [
    TicketListComponent,
    TicketListCardComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    TicketListComponent,
    TicketListCardComponent
  ]
})
export class TicketModule { }
