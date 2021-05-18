import { UuidType, Maybe } from '@/common/types';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import Tag from '@/entities/Tag';
import { StoryCardLocalStorageModel } from './models/StoryCardLocalStorageModel';
import { StoryTreeLocalStorageModel } from './models/StoryTreeLocalStorageModel';
import ITagProps from '@/interfaces/ITagProps';

export class StoryTreeLocalStorageMap {
  static toDomainModel(localStorageModel: StoryTreeLocalStorageModel): Tree<StoryCard> {
    const storyTreeDomainModel = Tree.create<StoryCard>(
      undefined,
      localStorageModel.id
    );
    
    const rootContext = Object.values(localStorageModel.tree)
      .find(({ isRoot }) => isRoot);

    // @TODO Test this case
    if (!rootContext) {
      throw new Error(`The root for the tree is not defined.`);
    }
  
    recursive(rootContext, rootContext.node.id, null);
  
    function recursive(
      nodeContext: { childrenIds: Array<string>, node: StoryCardLocalStorageModel },
      id: UuidType,
      parentId: Maybe<UuidType>
    ): any {
      storyTreeDomainModel.insert(StoryCard.create({
        header: nodeContext.node.header,
        body: nodeContext.node.body,
        tags: nodeContext.node.tags.map(
          (tagProps) => Tag.create(tagProps as ITagProps, tagProps.id)
        )
      }, id), parentId || undefined);
  
      if (nodeContext.childrenIds.length === 0) {
        return;
      }
  
      nodeContext.childrenIds.forEach((childId: UuidType) => {
        const childNodeContext = localStorageModel.tree[childId];
  
        if (!childNodeContext) {
          return;
        }
  
        recursive(childNodeContext, childId, id);
      });
    }
  
    return storyTreeDomainModel;
  }

  static toLocalStorageModel(domainModel: Tree<StoryCard>): StoryTreeLocalStorageModel {
    let tree = {};

    Array.from(domainModel.getRawTreeMap().entries()).map(([id, nodeContext]) => {
      tree[id] = {
        ...nodeContext,
        node: {
          body: nodeContext.node.body,
          header: nodeContext.node.header,
          id: nodeContext.node.id,
          tags: nodeContext.node.tags.map(({ color, id, label }) => ({
            color,
            id,
            label
          })),
        }
      };
    });

    return {
      id: domainModel.id,
      tree
    };
  }
}
