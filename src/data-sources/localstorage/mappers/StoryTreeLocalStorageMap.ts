import { UuidType, Maybe } from '@/common/types';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import Tag from '@/entities/Tag';
import ITagProps from '@/interfaces/ITagProps';
import { StoryTreeLocalStorageModel } from '../models/StoryTreeLocalStorageModel';
import { StoryCardLocalStorageModel } from '../models/StoryCardLocalStorageModel';
import { StoryTreeInfoLocalStorageModel } from '../models/StoryTreeInfoLocalStorageModel';
import { StoryTreeInfoLocalStorageMap } from './StoryTreeInfoLocalStorageMap';

export class StoryTreeLocalStorageMap {
  static toDomainModel(
    storyTreeRootLocalStorageModel: StoryTreeLocalStorageModel,
    storyTreeInfoLocalStorageModel: StoryTreeInfoLocalStorageModel
  ): Tree<StoryCard> {
    const storyTreeDomainModel = new Tree<StoryCard>(
      {
        info: StoryTreeInfoLocalStorageMap.toDomainModel(storyTreeInfoLocalStorageModel)
      },
      storyTreeRootLocalStorageModel.id
    );
    
    const rootContext = Object.values(storyTreeRootLocalStorageModel.tree)
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
      storyTreeDomainModel.insert(new StoryCard({
        header: nodeContext.node.header,
        body: nodeContext.node.body,
        tags: nodeContext.node.tags.map(
          (tagProps) => new Tag(tagProps as ITagProps, tagProps.id)
        )
      }, id), parentId || undefined);
  
      if (nodeContext.childrenIds.length === 0) {
        return;
      }
  
      nodeContext.childrenIds.forEach((childId: UuidType) => {
        const childNodeContext = storyTreeRootLocalStorageModel.tree[childId];
  
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

    if (!domainModel.info) {
      throw new Error(
        `[StoryTreeLocalStorageMap.toLocalStorageModel] Property "info" in domain entity is invalid.`
      );
    }

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
      infoId: domainModel.info.id,
      tree
    };
  }
}
