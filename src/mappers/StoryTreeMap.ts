import { Maybe } from '@/common/types';
import { crawlBreadthFirst } from '@/entities/Crawler';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { ITreeNodeContext } from '@/interfaces';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import TagMap from './TagMap';

export default class StoryTreeMap {
  static toViewModel(domainModel: Tree<StoryCard>): Maybe<StoryTreeViewModel> {
    const root = domainModel.getRoot();

    if (!root) {
      return null;
    }

    let out: StoryTreeViewModel = {
      id: root.id,
      header: root.header,
      body: root.body,
      tags: root.tags.map(TagMap.toViewModel),
      children: [],
      parentId: null
    };

    let childrenOf = {
      [root.id]: out.children
    }

    crawlBreadthFirst(domainModel, ({ node, parentId }: ITreeNodeContext<StoryCard>) => {
      if (node.id === root.id) {
        return;
      }

      const entry = {
        id: node.id,
        header: node.header,
        body: node.body,
        tags: node.tags.map(TagMap.toViewModel),
        children: [],
        parentId
      };

      Object.assign(childrenOf, {
        [node.id]: entry.children
      });

      childrenOf[parentId].push(entry);
    });

    return out;
  }
}
