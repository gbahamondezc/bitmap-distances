import { IteratorResult } from './types';
import { map, range, head, last } from 'ramda';
import { BitmapInfo, Bit, Point } from '../../types';

export const nextAsNumber = async (
  asyncIterator: AsyncIterator<Buffer>,
): Promise<number> => {
  const result: IteratorResult<Buffer> = await asyncIterator.next();

  return Number(result.value.toString());
};

export const nextAsNumbersArray = async (
  asyncIterator: AsyncIterator<Buffer>,
): Promise<number[]> => {
  const result: IteratorResult<Buffer> = await asyncIterator.next();

  return Array.from(
    result.value.toString().replace(/\s/gu, ''),
    (dimension: string) => Number(dimension),
  );
};

export const getBitmap = (
  stream: AsyncIterator<Buffer>,
  dimensions: number[],
): Promise<number[][]> =>
  Promise.all(
    map(() => nextAsNumbersArray(stream), range(0, head(dimensions))),
  );

export const getBitmapInfo = (
  bitmap: number[][],
  dimensions: number[],
): BitmapInfo => {
  const onBitsList: Point[] = [];
  bitmap.forEach((row: number[], rowIndex: number) =>
    row.forEach((value: Bit, colIndex: number) => {
      if (Bit.On === value) {
        onBitsList.push({
          row: rowIndex,
          column: colIndex,
          cost: 0,
        });
      }
    }),
  );

  return {
    rows: head(dimensions),
    columns: last(dimensions),
    onBitsList,
  };
};
