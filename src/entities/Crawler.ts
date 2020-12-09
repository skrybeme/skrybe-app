import { IIdentifiable, ITreeNodeContext } from '@/interfaces';
import { Queue } from '@/common/data-structures';
import { UuidType } from '@/common/types';
import Tree from './Tree';

export function crawlBreadthFirst<T extends IIdentifiable, R>(
  tree: Tree<T>,
  cb: (nodeContext: ITreeNodeContext<T>) => R,
  startNodeId?: UuidType
): Array<R> {
  const root = startNodeId
    ? tree.getNodeContextById(startNodeId)
    : tree.getRootContext();

  if (!root) {
    return [];
  }

  const out = [cb(root)];

  const q = new Queue<ITreeNodeContext<T>>();

  q.enqueue(root)

  while (!q.isEmpty()) {
    const u = q.dequeue();

    // isEmpty() returning false ensures that dequeue() returns a valid value.
    const children = tree.getNodeContextChildrenOf(u!.node.id);

    children?.forEach((child: ITreeNodeContext<T>) => {
      q.enqueue(child);

      out.push(cb(child));
    });
  }
  
  return out;
}

export function crawlDeepFirst<T extends IIdentifiable, R>(
  tree: Tree<T>,
  cb: (nodeContext: ITreeNodeContext<T>) => R,
  startNodeId?: UuidType
): Array<R> {
  const root = startNodeId
    ? tree.getNodeContextById(startNodeId)
    : tree.getRootContext();

  if (!root) {
    return [];
  }

  return dfs<T, R>(tree, root, cb);
}

function dfs<T extends IIdentifiable, R>(
  tree: Tree<T>,
  nodeContext: ITreeNodeContext<T>,
  cb: (nodeContext: ITreeNodeContext<T>) => R
): Array<R> {
  const children = tree.getNodeContextChildrenOf(nodeContext.node.id);

  if (!children || !children.length) {
    return [cb(nodeContext)];
  }

  return [cb(nodeContext)].concat(
    ...children.map(child => dfs<T, R>(tree, child, cb))
  );
}

export const crawl = crawlDeepFirst;
