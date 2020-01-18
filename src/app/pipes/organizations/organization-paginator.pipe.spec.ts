import { OrganizationPaginatorPipe } from './organization-paginator.pipe';

describe('OrganizationPaginatorPipe', () => {
  it('create an instance', () => {
    const pipe = new OrganizationPaginatorPipe();
    expect(pipe).toBeTruthy();
  });
});
