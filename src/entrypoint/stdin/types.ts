import { ReadStream } from 'fs';

export interface Stdin {
  stream: ReadStream;
  iterator: AsyncIterator<Buffer>;
}

export interface IteratorResult<TType> {
  done: boolean;
  value: TType;
}
