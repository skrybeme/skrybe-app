import { Maybe } from '@/common/types';
import { crawlBreadthFirst, crawlDeepFirst } from '@/entities/Crawler';
import { CrawlerCallbackType, CrawlerMethodType } from '@/entities/types';
import IGeneratedStory from './IGeneratedStory';
import ITreeNode from './ITreeNode';

// export default interface IStoryBuilder {
//   build(): IGeneratedStory;
//   for(treeNode: ITreeNode): IStoryBuilder;
//   go(method: CrawlerMethodType<Maybe<ITreeNode>>): IStoryBuilder;
//   pipe(...args: Array<CrawlerCallbackType<Maybe<ITreeNode>>>): IStoryBuilder;
// }

export type StoryBuilderCrawlDirectionType = typeof crawlBreadthFirst | typeof crawlDeepFirst;
export type StoryBuilderFilterType = (rawNode: RawTreeNode) => Maybe<RawTreeNode>;

export default interface IStoryBuilder {
  build(): IGeneratedStory;
  for(treeNode: ITreeNode): IStoryBuilder;
  go(direction: StoryBuilderCrawlDirectionType): IStoryBuilder;
  pipe(...args: Array<StoryBuilderFilterType>): IStoryBuilder;
}
