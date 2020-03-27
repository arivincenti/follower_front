import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StateFilterCounterPipe } from "./filter/state-filter-counter.pipe";
import { ImagePipe } from "./image/image.pipe";
import { TimePipe } from "./time/time.pipe";
import { SearchTicketPipe } from "./search/searchTicket/search-ticket.pipe";
import { SearchOrganizationPipe } from "./search/searchOrganization/search-organization.pipe";
import { SearchMemberPipe } from "./search/searchMember/search-member.pipe";
import { SearchAreaPipe } from "./search/searchArea/search-area.pipe";
import { PaginatorPipe } from "./paginator/paginator.pipe";

const pipes = [
  StateFilterCounterPipe,
  PaginatorPipe,
  ImagePipe,
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
