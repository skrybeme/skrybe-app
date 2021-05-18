import { UuidType, AsyncMaybe } from '@/common/types';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { IStoryTreeDataSource } from '@/interfaces';
import { StoryTreeLocalStorageMap } from './StoryTreeLocalStorageMap';
import { StoryTreeLocalStorageModel } from './models/StoryTreeLocalStorageModel';
import tree from './data/defaultStoryTree';

export function createLocalStorageStoryTreeDataSource(): IStoryTreeDataSource {
  return {
    boot(): void {
      if (localStorage.getItem('example-tree')) {
        return;
      }
      
      const treeLocalStorageModel = StoryTreeLocalStorageMap.toLocalStorageModel(tree);

      localStorage.setItem('example-tree', JSON.stringify(treeLocalStorageModel));
    },
    getById(_: UuidType): AsyncMaybe<Tree<StoryCard>> {
      const rawTree =
        JSON.parse(localStorage.getItem('example-tree')!) as StoryTreeLocalStorageModel;

      const tree = StoryTreeLocalStorageMap.toDomainModel(rawTree);

      return Promise.resolve(tree);
    },
    getCollection(): Promise<Tree<StoryCard>[]> {
      return Promise.resolve([]);
    },
    save(tree: Tree<StoryCard>): Promise<Tree<StoryCard>> {
      const treeLocalStorageModel = StoryTreeLocalStorageMap.toLocalStorageModel(tree);

      localStorage.setItem('example-tree', JSON.stringify(treeLocalStorageModel));

      return Promise.resolve(tree);
    }
  };
}
