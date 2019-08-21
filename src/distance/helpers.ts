import { Point } from '../types';
import { Direction } from './types';
import { getIn, List } from 'immutable';

export const directionsTotal = 4;

export const createInfinityMap = (rows: number, cols: number): number[][] =>
  Array(rows).fill(Array(cols).fill(Infinity));

export const getPointForDirection = (
  direction: Direction,
  current: Point,
): Point => {
  const directionsMap = {
    [Direction.Up]: {
      row: current.row - 1,
      column: current.column,
      cost: current.cost,
    },
    [Direction.Down]: {
      row: current.row + 1,
      column: current.column,
      cost: current.cost,
    },
    [Direction.Left]: {
      row: current.row,
      column: current.column - 1,
      cost: current.cost,
    },
    [Direction.Right]: {
      row: current.row,
      column: current.column + 1,
      cost: current.cost,
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
  rows: number,
  columns: number,
): boolean =>
  point.row >= 0 &&
  point.row < rows &&
  point.column >= 0 &&
  point.column < columns;
