import { Pipe, PipeTransform } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';

@Pipe({
  name: 'organizationPaginator'
})
export class OrganizationPaginatorPipe implements PipeTransform {

  transform(organizations: OrganizationModel[], since: number, until: number): OrganizationModel []
  {
    return organizations.slice(since, until);
  }

}
