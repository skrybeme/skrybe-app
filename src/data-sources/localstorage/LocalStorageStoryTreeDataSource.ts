import { UuidType, AsyncMaybe } from '@/common/types';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { IStoryTreeDataSource } from '@/interfaces';
import { StoryTreeLocalStorageMap } from './StoryTreeLocalStorageMap';
import { StoryTreeLocalStorageModel } from './models/StoryTreeLocalStorageModel';
import defaultTree from './data/defaultStoryTree';

export class LocalStorageStoryTreeDataSource implements IStoryTreeDataSource {
  boot(): void {
    let tree: Tree<StoryCard>;
  
    try {
      const rawTree =
        JSON.parse(localStorage.getItem('example-tree')!) as StoryTreeLocalStorageModel;

      tree = StoryTreeLocalStorageMap.toDomainModel(rawTree);
    } catch (e) {
      localStorage.removeItem('example-tree');

      const treeLocalStorageModel = StoryTreeLocalStorageMap.toLocalStorageModel(defaultTree);

      localStorage.setItem('example-tree', JSON.stringify(treeLocalStorageModel));
    }
  }

  getById(_: UuidType): AsyncMaybe<Tree<StoryCard>> {
    let tree: Tree<StoryCard>;
  
    try {
      const rawTree =
        JSON.parse(localStorage.getItem('example-tree')!) as StoryTreeLocalStorageModel;

      tree = StoryTreeLocalStorageMap.toDomainModel(rawTree);
    } catch (e) {
      return Promise.resolve(null);
    }

    return Promise.resolve(tree);
  }

  getCollection(): Promise<Tree<StoryCard>[]> {
    return Promise.resolve([]);
  }

  save(tree: Tree<StoryCard>): Promise<Tree<StoryCard>> {
    const treeLocalStorageModel = StoryTreeLocalStorageMap.toLocalStorageModel(tree);

    localStorage.setItem('example-tree', JSON.stringify(treeLocalStorageModel));

    return Promise.resolve(tree);
  }
}
