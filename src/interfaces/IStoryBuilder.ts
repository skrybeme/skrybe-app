import { Maybe } from '@/common/types';
import { CrawlerCallbackType, CrawlerMethodType } from '@/entities/types';
import IGeneratedStory from './IGeneratedStory';
import ITreeNode from './ITreeNode';

export default interface IStoryBuilder {
  build(): IGeneratedStory;
  for(treeNode: ITreeNode): IStoryBuilder;
  go(method: CrawlerMethodType<Maybe<ITreeNode>>): IStoryBuilder;
  pipe(...args: Array<CrawlerCallbackType<Maybe<ITreeNode>>>): IStoryBuilder;
}
