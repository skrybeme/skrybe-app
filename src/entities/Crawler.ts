import { IIdentifiable } from '@/interfaces';
import { Queue } from '@/common/data-structures';
import { UuidType } from '@/common/types';
import Tree from './Tree';

export function crawlBreadthFirst<T extends IIdentifiable, R>(
  tree: Tree<T>,
  cb: (node: T) => R,
  startNodeId?: UuidType
): Array<R> {
  const root = startNodeId ? tree.getNodeById(startNodeId) : tree.getRoot();

  if (!root) {
    return [];
  }

  const out = [cb(root)];

  const q = new Queue<T>();

  q.enqueue(root)

  while (!q.isEmpty()) {
    const u = q.dequeue();

    // isEmpty() returning false ensures that dequeue() returns a valid value.
    const children = tree.getChildrenOf(u!.id);

    children?.forEach((child: T) => {
      q.enqueue(child);

      out.push(cb(child));
    });
  }
  
  return out;
}

export function crawlDeepFirst<T extends IIdentifiable, R>(
  tree: Tree<T>,
  cb: (node: T) => R,
  startNodeId?: UuidType
): Array<R> {
  const root = startNodeId ? tree.getNodeById(startNodeId) : tree.getRoot();

  if (!root) {
    return [];
  }

  return dfs<T, R>(tree, root, cb);
}

function dfs<T extends IIdentifiable, R>(
  tree: Tree<T>,
  node: T,
  cb: (node: T) => R
): Array<R> {
  const children = tree.getChildrenOf(node.id);

  if (!children || !children.length) {
    return [cb(node)];
  }

  return [cb(node)].concat(
    ...children.map(child => dfs<T, R>(tree, child, cb))
  );
}

export const crawl = crawlDeepFirst;
