import { ITreeNode } from '@/interfaces';

export function crawl<T>(root: ITreeNode, cb: (node: ITreeNode) => T): Array<T> {
  const children = root.getChildren();

  return [cb(root)].concat(
    ...children.map(child => crawl(child as ITreeNode, cb))
  );
}
