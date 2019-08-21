import { List } from 'immutable';

export enum Bit {
  On = 1,
  Off = 0,
}

export interface Point {
  row: number;
  column: number;
  cost?: number;
}

export interface BitmapInfo {
  rows: number;
  columns: number;
  onBitsList: Point[];
}

export interface BitsDistanceCalculator {
  distancesToNearestONBit: (bitMapInfo: BitmapInfo) => List<List<number>>;
}

export interface EntryPoint {
  start: (distanceCalculator: BitsDistanceCalculator) => Promise<void>;
}
