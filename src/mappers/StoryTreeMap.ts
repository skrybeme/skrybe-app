import { Maybe } from '@/common/types';
import { crawlBreadthFirst } from '@/entities/Crawler';
import { ITreeNodeContext } from '@/interfaces';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import TagMap from './TagMap';

export default class StoryTreeMap {
  static toViewModel(domainModel: Tree<StoryCard>): Maybe<StoryTreeViewModel> {
    const root = domainModel.getRoot();

    if (!root) {
      return null;
    }

    let out: StoryTreeViewModel = {
      body: root.body,
      children: [],
      header: root.header,
      id: root.id,
      parentId: null,
      tags: root.tags.map(TagMap.toViewModel),
      treeRootId: domainModel.id
    };

    let childrenOf = {
      [root.id]: out.children
    }

    crawlBreadthFirst(domainModel, ({ node, parentId }: ITreeNodeContext<StoryCard>) => {
      if (node.id === root.id) {
        return;
      }

      const entry: StoryTreeViewModel = {
        body: node.body,
        children: [],
        header: node.header,
        id: node.id,
        parentId,
        tags: node.tags.map(TagMap.toViewModel),
        treeRootId: domainModel.id
      };

      Object.assign(childrenOf, {
        [node.id]: entry.children
      });

      childrenOf[parentId].push(entry);
    });

    return out;
  }
}
