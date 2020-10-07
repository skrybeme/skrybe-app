import { Maybe } from '@/common/types';
import { crawlBreadthFirst } from '@/entities/Crawler';
import { ITree, ITreeNode, UIStoryTree } from '@/interfaces';

// @TODO
// Implement this in a way that reduces memory complexity.
export default function mapTreeToUIStoryTree(tree: ITree): Maybe<UIStoryTree> {
  const root = tree.getRoot();

  if (!root) {
    return null;
  }

  const rootStoryCard = root.getStoryCard();

  let out: UIStoryTree = {
    id: root.id,
    header: rootStoryCard.header,
    body: rootStoryCard.body,
    tags: rootStoryCard.tags,
    children: []
  };

  let childrenOf = {
    [root.id]: out.children
  }

  crawlBreadthFirst<void>(tree.getRoot()!, (node: ITreeNode) => {
    if (node.id === root.id) {
      return;
    }
  
    const storyCard = node.getStoryCard();

    const entry = {
      id: node.id,
      header: storyCard.header,
      body: storyCard.body,
      tags: storyCard.tags,
      children: []
    };
    
    Object.assign(childrenOf, {
      [node.id]: entry.children
    });

    childrenOf[node.parentId].push(entry);
  });

  return out;
}
