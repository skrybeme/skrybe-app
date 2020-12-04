import { IIdentifiable } from '@/interfaces';
import Tree from './Tree';

function bfs<T extends IIdentifiable, R>(
  tree: Tree<T>,
  node: T,
  cb: (node: T) => R
): Array<R> {
  const children = tree.getChildrenOf(node.id);

  if (!children || !children.length) {
    return [];
  }

  return children.map((child: T) => cb(child)).concat(
    ...children.map((child: T) => bfs<T, R>(tree, child, cb))
  );
}

export function crawlBreadthFirst<T extends IIdentifiable, R>(
  tree: Tree<T>,
  cb: (node: T) => R
): Array<R> {
  const root = tree.getRoot();

  if (!root) {
    return [];
  }
  
  return [cb(root)].concat(...bfs<T, R>(tree, root, cb));
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

export function crawlDeepFirst<T extends IIdentifiable, R>(
  tree: Tree<T>,
  cb: (node: T) => R
): Array<R> {
  const root = tree.getRoot();

  if (!root) {
    return [];
  }

  return dfs<T, R>(tree, root, cb);
}

export const crawl = crawlDeepFirst;
