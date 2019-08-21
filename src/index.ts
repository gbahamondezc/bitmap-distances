import stdinEntryPoint from './entrypoint/stdin';
import distancesToNearestONBitCalculator from './distance';
import { EntryPoint, BitsDistanceCalculator } from './types';

import logger from './logger';

const start = (
  entrypoint: EntryPoint,
  distancesCalculator: BitsDistanceCalculator,
): Promise<void> => entrypoint.start(distancesCalculator);

start(stdinEntryPoint, distancesToNearestONBitCalculator).catch(
  (error: Error) => {
    logger.error(error);
  },
);
