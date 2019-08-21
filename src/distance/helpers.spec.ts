import { createInfinityMap } from './helpers';
describe('distance calculator helpers tests', () => {
  it('must create an infinity map from given row, cols', () => {
    const rows = 2;
    const columns = 3;

    const expected = [
      [Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity],
    ];

    expect(
      createInfinityMap({
        rows,
        columns,
      }),
    ).toStrictEqual(expected);
  });
});
