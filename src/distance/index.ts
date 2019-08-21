import {
  Direction,
  DistanceMapWithSources,
  DistanceMapWithSourcesPair,
  BFSPipeData,
  BitmapDimensions,
} from './types';
import { Point, BitmapInfo } from '../types';

import {
  createInfinityMap,
  incPointCostWithDirection,
  directionsTotal,
  isUnvisitedAndInsideTheMap,
} from './helpers';

import { pipe, reduce, ifElse, identity, range } from 'ramda';
import { fromJS, setIn, List, getIn, Map } from 'immutable';

const buildData = (data: DistanceMapWithSources): BFSPipeData => {
  const rawBit: Map<string, number> = data.sources.first();
  const onBit: Point = {
    row: rawBit.get('row'),
    column: rawBit.get('column'),
    cost: rawBit.get('cost'),
  };

  return {
    onBit,
    distancesMap: data.distancesMap,
    sources: data.sources,
    dimensions: data.dimensions,
  };
};

const hasLowerCost = (data: BFSPipeData): boolean =>
  data.onBit.cost <
  getIn(data.distancesMap, [data.onBit.row, data.onBit.column], Infinity);

const setNewCost = (data: BFSPipeData): BFSPipeData => ({
  onBit: data.onBit,
  distancesMap: setIn(
    data.distancesMap,
    [data.onBit.row, data.onBit.column],
    data.onBit.cost,
  ),
  sources: data.sources,
  dimensions: data.dimensions,
});

const loopUpdatingDistancesMap = (
  data: BFSPipeData,
): DistanceMapWithSourcesPair =>
  reduce(
    (mapWithSources: DistanceMapWithSourcesPair, direction: Direction) => {
      const updated: Point = incPointCostWithDirection(direction, data.onBit);
      const [distancesMap, sources] = mapWithSources;

      if (
        isUnvisitedAndInsideTheMap({
          onBit: updated,
          distancesMap,
          dimensions: data.dimensions,
        })
      ) {
        return [
          setIn(distancesMap, [updated.row, updated.column], updated.cost),
          sources.push(fromJS(updated)),
        ];
      }

      return mapWithSources;
    },
    [data.distancesMap, data.sources.shift()],
    range(0, directionsTotal),
  );

const bfsPipe = pipe(
  buildData,
  ifElse(hasLowerCost, setNewCost, identity),
  loopUpdatingDistancesMap,
);

const multiSourceBFS = (data: DistanceMapWithSources): List<List<number>> => {
  if (data.sources.isEmpty()) {
    return data.distancesMap;
  }

  const [distancesMap, sources] = bfsPipe(data);

  return multiSourceBFS({
    dimensions: data.dimensions,
    distancesMap,
    sources,
  });
};

const distancesToNearestONBit = (bitmapInfo: BitmapInfo): number[][] => {
  const dimensions: BitmapDimensions = {
    rows: bitmapInfo.rows,
    columns: bitmapInfo.columns,
  };
  const distancesMap = fromJS(createInfinityMap(dimensions));
  const sources = fromJS(bitmapInfo.onBitsList);

  return multiSourceBFS({
    dimensions,
    sources,
    distancesMap,
  }).toJS();
};

export default { distancesToNearestONBit };
