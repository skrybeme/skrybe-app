import { ITreeNode } from '@/interfaces';

export function crawlBreadthFirst<T>(root: ITreeNode, cb: (node: ITreeNode) => T): Array<T> {
  const children = root.getTree().getChildrenOf(root);

  return [cb(root)].concat(
    ...children.map(child => crawl(child as ITreeNode, cb))
  );
}

export function crawlDeepFirst<T>(root: ITreeNode, cb: (node: ITreeNode) => T): Array<T> {
  const children = root.getTree().getChildrenOf(root);

  return [cb(root)].concat(
    ...children.map(child => crawl(child as ITreeNode, cb))
  );
}

export const crawl = crawlBreadthFirst;
