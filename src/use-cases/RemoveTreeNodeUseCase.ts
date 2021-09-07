import { AsyncMaybe } from '@/common/types';
import { IExecutable, IStoryTreeRepo } from '@/interfaces';
import { RemoveTreeNodeRequest } from '@/interfaces/requests';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import StoryCard from '@/entities/StoryCard';

export class RemoveTreeNodeUseCase implements IExecutable<
  RemoveTreeNodeRequest,
  AsyncMaybe<StoryCard>
> {
  constructor(
    private _treeRepo: IStoryTreeRepo,
    private _storyTreeRootDetailsStore: StoryTreeRootDetailsStore
  ) {}

  async execute(request: RemoveTreeNodeRequest): AsyncMaybe<StoryCard> {
    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      return Promise.resolve(null);
    }

    const node = tree.getNodeById(request.id);
      
    if (!node) {
      return Promise.resolve(null);
    }

    // The insert method needs to return inserted node object.
    tree.removeById(node.id);

    await this._treeRepo.save(tree);

    this._storyTreeRootDetailsStore.set({
      data: tree,
      isError: false,
      isLoading: false
    });

    return Promise.resolve(node);
  }
}
