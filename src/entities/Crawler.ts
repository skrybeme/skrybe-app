import { ITreeNode } from '@/interfaces';

export function crawlBreadthFirst<T>(root: ITreeNode, cb: (node: ITreeNode) => T): Array<T> {
  function bfs(treeNode: ITreeNode, cb: (node: ITreeNode) => T): any {
    const children = treeNode.getTree().getChildrenOf(treeNode);

    return []
      // @ts-ignore
      .concat(...children.map(child => cb(child as ITreeNode)))
      .concat(...children.map(child => bfs(child as ITreeNode, cb)));
  }
  
  return [cb(root)].concat(...bfs(root, cb));
}

export function crawlDeepFirst<T>(root: ITreeNode, cb: (node: ITreeNode) => T): Array<T> {
  const children = root.getTree().getChildrenOf(root);

  return [cb(root)].concat(
    ...children.map(child => crawl(child as ITreeNode, cb))
  );
}

export const crawl = crawlDeepFirst;
