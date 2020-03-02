import { orderByPopularity } from './api';

it('returns empty array if no items', () => {
  const input = [];
  const expected = [];

  expect(orderByPopularity(input)).toEqual(expected);
});

it('orders items by popularity descending', () => {
  const input = [{
    popularity: 1,
    title: 'abc'
  }, {
    popularity: 5,
    title: 'def'
  }];
  const expected = [{
    popularity: 5,
    title: 'def'
  }, {
    popularity: 1,
    title: 'abc'
  }];

  expect(orderByPopularity(input)).toEqual(expected);
});
