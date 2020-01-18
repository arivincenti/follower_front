import { TicketPaginatorPipe } from './ticket-paginator.pipe';

describe('TicketPaginatorPipe', () => {
  it('create an instance', () => {
    const pipe = new TicketPaginatorPipe();
    expect(pipe).toBeTruthy();
  });
});
