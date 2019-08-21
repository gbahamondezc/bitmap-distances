import { Point, BitmapInfo } from '../types';
import { List, fromJS } from 'immutable';
import distanceCalculator from '.';

describe('distances', () => {
  it('must calculate distances to nearest `on bit` point for each `off bit` poit in the map', () => {
    const expected: List<List<number>> = fromJS([
      [3, 2, 1, 0],
      [2, 1, 0, 0],
      [1, 0, 0, 1],
    ]);
    const onBitsSources: Point[] = [
      {
        row: 0,
        column: 3,
        cost: 0,
      },
      {
        row: 1,
        column: 2,
        cost: 0,
      },
      {
        row: 1,
        column: 3,
        cost: 0,
      },
      {
        row: 2,
        column: 1,
        cost: 0,
      },
      {
        row: 2,
        column: 2,
        cost: 0,
      },
    ];

    const info: BitmapInfo = {
      rows: 3,
      columns: 4,
      onBitsList: onBitsSources,
    };

    expect(distanceCalculator.distancesToNearestONBit(info)).toStrictEqual(
      expected,
    );
  });

  it('must calculate distances to nearest `on bit` point for each `off bit` poit in the map 2', () => {
    const expected: List<List<number>> = fromJS([[2, 1], [1, 0]]);
    const onBitsSources: Point[] = [
      {
        row: 1,
        column: 1,
        cost: 0,
      },
    ];

    const info: BitmapInfo = {
      rows: 2,
      columns: 2,
      onBitsList: onBitsSources,
    };

    expect(distanceCalculator.distancesToNearestONBit(info)).toStrictEqual(
      expected,
    );
  });
});
