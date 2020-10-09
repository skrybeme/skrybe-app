import { ITreeNode } from '@/interfaces';

export type ColorType =
  'green' |
  'yellow' |
  'orange' |
  'red' |
  'purple' |
  'magenta' |
  'blue' |
  'lightblue' |
  'lightgreen' |
  'pink' |
  'darkblue' |
  'grey';
export type CrawlerCallbackType<T> = (node: ITreeNode) => T;
export type CrawlerMethodType<T> = (
  root: ITreeNode,
  cb: (node: ITreeNode) => T
) => Array<T>;
