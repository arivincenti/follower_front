import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StateFilterCounterPipe } from "./filter/state-filter-counter.pipe";
import { AreasPaginatorPipe } from "./areas/areas-paginator.pipe";
import { MemberPaginatorPipe } from "./members/member-paginator.pipe";
import { ImagePipe } from "./image/image.pipe";
import { TicketPaginatorPipe } from "./tickets/ticket-paginator.pipe";
import { OrganizationPaginatorPipe } from "./organizations/organization-paginator.pipe";
import { TimePipe } from "./time/time.pipe";
import { SearchTicketPipe } from "./search/searchTicket/search-ticket.pipe";
import { SearchOrganizationPipe } from "./search/searchOrganization/search-organization.pipe";
import { SearchMemberPipe } from "./search/searchMember/search-member.pipe";
import { SearchAreaPipe } from "./search/searchArea/search-area.pipe";

const pipes = [
  StateFilterCounterPipe,
  AreasPaginatorPipe,
  MemberPaginatorPipe,
  ImagePipe,
  TicketPaginatorPipe,
  OrganizationPaginatorPipe,
  TimePipe,
  SearchTicketPipe,
  SearchOrganizationPipe,
  SearchMemberPipe,
  SearchAreaPipe
];

@NgModule({
  declarations: [pipes],
  imports: [CommonModule],
  exports: [pipes]
})
export class PipesModule {}
