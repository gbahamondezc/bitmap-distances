import { pipe, reduce, ifElse, identity } from 'ramda';
import {
  BitmapDimensions,
  Direction,
  DistanceMapWithSources,
  DistanceMapWithSourcesPair,
  BFSPipeData,
  BFSInput,
} from './types';
import { Point, BitmapInfo } from '../types';

import {
  createInfinityMap,
  getPointForDirection,
  directionsTotal,
  isPointInsideMap,
  isUnvisited,
} from './helpers';

import { fromJS, setIn, List, getIn, Map, Range } from 'immutable';

const incrementPointCost = (point: Point): Point => ({
  row: point.row,
  column: point.column,
  cost: point.cost + 1,
});

const hasLowerCost = (data: {
  onBit: Point;
  distancesMap: List<List<number>>;
  sources: List<Map<string, number>>;
  dimensions: BitmapDimensions;
}): boolean =>
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

const getModifiedMap = (data: BFSPipeData): DistanceMapWithSourcesPair =>
  reduce(
    (elements: DistanceMapWithSourcesPair, direction: Direction) => {
      const nextPoint: Point = getPointForDirection(
        direction,
        incrementPointCost(data.onBit),
      );

      if (
        isUnvisited(nextPoint, elements[0]) &&
        isPointInsideMap(
          nextPoint,
          data.dimensions.rows,
          data.dimensions.columns,
        )
      ) {
        return [
          setIn(elements[0], [nextPoint.row, nextPoint.column], nextPoint.cost),
          elements[1].push(fromJS(nextPoint)),
        ];
      }

      return elements;
    },
    [data.distancesMap, data.sources.shift()],
    Range(0, directionsTotal).toJS(),
  );

const constructData = (data: DistanceMapWithSources): BFSPipeData => {
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

const bfsPipe = pipe(
  constructData,
  ifElse(hasLowerCost, setNewCost, identity),
  getModifiedMap,
);

const multiSourceBFS = (
  dimensions: BitmapDimensions,
  sources: List<Map<string, number>>,
  distancesMap: List<List<number>>,
): List<List<number>> => {
  if (sources.isEmpty()) {
    return distancesMap;
  }

  const results = bfsPipe({
    sources,
    distancesMap,
    dimensions,
  });

  return multiSourceBFS(dimensions, results[1], results[0]);
};

const distancesToNearestONBit = ({
  rows,
  columns,
  onBitsList,
}: BitmapInfo): List<List<number>> => {
  const distancesMap: List<List<number>> = fromJS(
    createInfinityMap(rows, columns),
  );

  const sources: List<Map<string, number>> = fromJS(onBitsList);

  return multiSourceBFS(
    {
      rows,
      columns,
    },
    sources,
    distancesMap,
  );
};

export default { distancesToNearestONBit };
