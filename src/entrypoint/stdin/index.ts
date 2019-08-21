import { range } from 'ramda';
import { Stdin } from './types';
import logger from '../../logger';
import fs, { ReadStream } from 'fs';
import {
  nextAsNumber,
  nextAsNumbersArray,
  getBitmap,
  getBitmapInfo,
} from './helpers';

import { BitmapInfo, BitsDistanceCalculator } from '../../types';

const getStdin = (): Stdin => {
  const stdinStream: ReadStream = fs.createReadStream('/dev/stdin');

  const stdinIterator: AsyncIterator<Buffer> = stdinStream[
    Symbol.asyncIterator
  ]();

  return {
    stream: stdinStream,
    iterator: stdinIterator,
  };
};

const casesStream = async function* casesStream(
  inputStream: AsyncIterator<Buffer>,
): AsyncIterable<BitmapInfo> {
  const dimensions: number[] = await nextAsNumbersArray(inputStream);
  const bitmap: number[][] = await getBitmap(inputStream, dimensions);
  yield getBitmapInfo(bitmap, dimensions);
};

export const start = async (
  distanceCalculator: BitsDistanceCalculator,
): Promise<void> => {
  logger.info('> Give me some input!');
  const { stream, iterator } = getStdin();

  const numberOfCases: number = await nextAsNumber(iterator);

  for (const caseNumber of range(0, numberOfCases)) {
    logger.info(`> Press Enter key to see case ${caseNumber + 1} distances...`);

    for await (const caseRow of casesStream(iterator)) {
      logger.success('> Distances: ');
      logger.table(distanceCalculator.distancesToNearestONBit(caseRow));
    }
  }

  logger.info('> Done, press Enter key to exit ...');
  stream.destroy();
};

export default { start };
