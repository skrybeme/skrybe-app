import { LOGICAL_OPERATOR } from '@/common/enums';
import { Maybe, UuidType } from '@/common/types';
import { crawlBreadthFirst, crawlDeepFirst } from '@/entities/Crawler';
import { CrawlerCallbackType, CrawlerMethodType } from '@/entities/types';
import {
  IGeneratedStory,
  IStoryBuilder,
  IStoryUseCases,
  ITag,
  ITreeNode,
} from '@/interfaces';

export function createStoryUseCases(): IStoryUseCases {
  let _callbacksPipeline: Array<CrawlerCallbackType<Maybe<ITreeNode>>> = [];
  let _crawlFunction: CrawlerMethodType<Maybe<ITreeNode>>;
  let _treeNode: ITreeNode;

  return {
    buildStory(): IStoryBuilder {
      return {
        // @TODO
        // Implement the desired behavior in the case of more than one callback passed
        // through pipe.
        build(): IGeneratedStory {
          return _crawlFunction(_treeNode, _callbacksPipeline[0]).filter(n => n);
        },
        for(treeNode: ITreeNode): IStoryBuilder {
          _treeNode = treeNode;

          return this;
        },
        go(method: CrawlerMethodType<Maybe<ITreeNode>>): IStoryBuilder {
          _crawlFunction = method;

          return this;
        },
        pipe(...args: Array<CrawlerCallbackType<Maybe<ITreeNode>>>): IStoryBuilder {
          _callbacksPipeline = _callbacksPipeline.concat(...args);

          return this;
        }
      };
    },
    breadth(): CrawlerMethodType<Maybe<ITreeNode>> {
      return crawlBreadthFirst;
    },
    byEdgeNodes(): CrawlerCallbackType<Maybe<ITreeNode>> {
      return (node: ITreeNode) => {
        if (!node) {
          return null;
        }
    
        if (!node.getChildrenIds() || !node.getChildrenIds().length) {
          return node;
        }

        return null;
      };
    },
    byNodeIds(ids: Array<UuidType>): CrawlerCallbackType<Maybe<ITreeNode>> {
      return (node: ITreeNode) => {
        if (!node) {
          return null;
        }

        if (ids.indexOf(node.id) > -1) {
          return node;
        }

        return null;
      };
    },
    byTags(
      ids: Array<UuidType>,
      operator?: LOGICAL_OPERATOR
    ): CrawlerCallbackType<Maybe<ITreeNode>> {
      return (node: ITreeNode) => {
        if (!node) {
          return null;
        }

        const card = node.getStoryCard();

        if (card.tags.length < 0) {
          return null;
        }

        const cardTagIds = card.tags.map(tag => tag.id);

        // @TODO
        // Move this array logic to commom utility functions
        const hasRequiredTags = !operator || operator === LOGICAL_OPERATOR.OR
          ? card.tags.filter(
              (tag: ITag) => tag.id && ids.indexOf(tag.id) > -1
            ).length > 0
          : ids.filter(
              (id: UuidType) => cardTagIds.indexOf(id) > -1
            ).length === ids.length

        if (hasRequiredTags) {
          return node;
        }

        return null;
      }
    },
    deep(): CrawlerMethodType<Maybe<ITreeNode>> {
      return crawlDeepFirst;
    }
  }
}
