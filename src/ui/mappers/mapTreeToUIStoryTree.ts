import { Maybe } from '@/common/types';
import { crawlBreadthFirst } from '@/entities/Crawler';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { ITreeNode, UIStoryTree } from '@/interfaces';

// @TODO
// Implement this in a way that reduces memory complexity.
export default function mapTreeToUIStoryTree(tree: Tree<StoryCard>): Maybe<UIStoryTree> {
  const root = tree.getRoot();

  if (!root) {
    return null;
  }

  const rootStoryCard = root;

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

  // @ts-ignore
  crawlBreadthFirst<any, any>(tree.getRoot()!, (node: StoryCard) => {
    if (node.id === root.id) {
      return;
    }
  
    const storyCard = node;

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
