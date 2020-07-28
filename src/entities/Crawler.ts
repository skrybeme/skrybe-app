import { ITreeNode } from '@/interfaces';

export function crawl<T>(root: ITreeNode, cb: Function): Array<T> {
  const children = root.getChildren();

  return [cb(root)].concat(
    ...children.map(child => crawl(<ITreeNode>child, cb))
  );
}
