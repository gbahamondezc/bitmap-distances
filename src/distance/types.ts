/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Point } from '../types';
import { List, Map } from 'immutable';

export enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3,
}

export interface BitmapDimensions {
  rows: number;
  columns: number;
}

export type DistanceMapWithSourcesPair = [
  List<List<number>>,
  List<Map<string, number>>
];

export interface DistanceMapWithSources {
  sources: List<Map<string, number>>;
  distancesMap: List<List<number>>;
  dimensions: BitmapDimensions;
}

export interface BFSPipeData {
  onBit: Point;
  distancesMap: List<List<number>>;
  sources?: List<Map<string, number>>;
  dimensions: BitmapDimensions;
}
