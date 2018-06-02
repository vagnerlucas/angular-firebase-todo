import { OrderByDatePipe } from './orderby-date.pipe';

describe('orderbyDatePipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByDatePipe();
    expect(pipe).toBeTruthy();
  });
});
