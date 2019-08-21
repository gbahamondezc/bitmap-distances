import { IteratorResult } from './types';
import { nextAsNumber, nextAsNumbersArray } from './helpers';

describe('entrypoints helper functions', () => {
  it('must extract value to number from iterator object', async () => {
    const result: IteratorResult<Buffer> = {
      done: false,
      value: Buffer.from('10', 'utf-8'),
    };

    const asyncIterator: AsyncIterator<Buffer> = {
      next: (): Promise<IteratorResult<Buffer>> => Promise.resolve(result),
    };
    const resultAsNumber = await nextAsNumber(asyncIterator);
    expect(resultAsNumber).toBe(10);
  });

  it('must extract array of numbers from async iterator object', async () => {
    const result: IteratorResult<Buffer> = {
      done: false,
      value: Buffer.from('3 4 5', 'utf-8'),
    };

    const asyncIterator: AsyncIterator<Buffer> = {
      next: (): Promise<IteratorResult<Buffer>> => Promise.resolve(result),
    };

    const dimensions: number[] = await nextAsNumbersArray(asyncIterator);
    expect(dimensions).toStrictEqual([3, 4, 5]);
  });
});
