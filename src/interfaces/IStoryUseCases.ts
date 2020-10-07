import { Maybe, UuidType } from '@/common/types';
import { CrawlerCallbackType, CrawlerMethodType } from '@/entities/types';
import IStoryBuilder from './IStoryBuilder';
import ITreeNode from './ITreeNode';
import { LOGICAL_OPERATOR } from '@/common/enums';

export default interface IStoryUseCases {
  buildStory(): IStoryBuilder;
  bfs(): CrawlerMethodType<Maybe<ITreeNode>>;
  byEdgeNodes(): CrawlerCallbackType<Maybe<ITreeNode>>;
  byNodeIds(ids: Array<UuidType>): CrawlerCallbackType<Maybe<ITreeNode>>;
  byTags(ids: Array<UuidType>, operator?: LOGICAL_OPERATOR): CrawlerCallbackType<Maybe<ITreeNode>>;
  dfs(): CrawlerMethodType<Maybe<ITreeNode>>;
}
