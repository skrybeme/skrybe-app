import { ITreeNode } from '@/interfaces';

export type ColorType = 'black' | 'grey' | 'red';
export type CrawlerCallbackType<T> = (node: ITreeNode) => T;
export type CrawlerMethodType<T> = (
  root: ITreeNode,
  cb: (node: ITreeNode) => T
) => Array<T>;
