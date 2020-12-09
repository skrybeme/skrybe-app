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
    return Promise.resolve(this._treeCollection);
  }

  save(tree: Tree<StoryCard>): Promise<Tree<StoryCard>> {
    const index = this._treeCollection.findIndex((t) => t.equals(tree));

    if (index < 0) {
      this._treeCollection.push(tree);
    } else {
      this._treeCollection.splice(index, 1, tree);
    }

    return Promise.resolve(tree);
  }
}
