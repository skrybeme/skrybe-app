import { AsyncMaybe, UuidType } from '@/common/types';
import { IStoryTreeRepo } from '@/interfaces';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

export default class InMemoryStoryTreeRepo implements IStoryTreeRepo {
  constructor(private _treeCollection: Tree<StoryCard>[] = []) {}

  getById(id: UuidType): AsyncMaybe<Tree<StoryCard>> {
    const result = this._treeCollection.find((tree) => tree.id === id);

    return Promise.resolve(result || null);
  }

  getCollection(): Promise<Tree<StoryCard>[]> {
    return Promise.resolve([]);
  }

  save(tree: Tree<StoryCard>): Promise<Tree<StoryCard>> {
    return Promise.resolve(tree);
  }
}
