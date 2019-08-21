import { Point } from '../types';
import { Direction, BitmapDimensions, BFSPipeData } from './types';
import { getIn, List } from 'immutable';

export const directionsTotal = 4;

export const createInfinityMap = (dims: BitmapDimensions): number[][] =>
  Array(dims.rows).fill(Array(dims.columns).fill(Infinity));

export const incPointCostWithDirection = (
  direction: Direction,
  current: Point,
): Point => {
  const directionsMap = {
    [Direction.Up]: {
      row: current.row - 1,
      column: current.column,
      cost: current.cost + 1,
    },
    [Direction.Down]: {
      row: current.row + 1,
      column: current.column,
      cost: current.cost + 1,
    },
    [Direction.Left]: {
      row: current.row,
      column: current.column - 1,
      cost: current.cost + 1,
    },
    [Direction.Right]: {
      row: current.row,
      column: current.column + 1,
      cost: current.cost + 1,
    },
  };

  return directionsMap[direction];
};

export const isUnvisited = (
  point: Point,
  distancesMap: List<List<number>>,
): boolean =>
  getIn(distancesMap, [point.row, point.column], undefined) === Infinity;

export const isPointInsideMap = (
  point: Point,
  dimensions: BitmapDimensions,
): boolean =>
  point.row >= 0 &&
  point.row < dimensions.rows &&
  point.column >= 0 &&
  point.column < dimensions.columns;

export const isUnvisitedAndInsideTheMap = (data: BFSPipeData): boolean => {
  return (
    isUnvisited(data.onBit, data.distancesMap) &&
    isPointInsideMap(data.onBit, data.dimensions)
  );
};
