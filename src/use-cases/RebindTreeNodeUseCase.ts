import { IExecutable, IStoryTreeRepo } from '@/interfaces';
import { RebindTreeNodeRequest } from '@/interfaces/requests';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import StoryCard from '@/entities/StoryCard';

export class RebindTreeNodeUseCase implements IExecutable<
  RebindTreeNodeRequest,
  Promise<StoryCard>
> {
  constructor(
    private _treeRepo: IStoryTreeRepo,
    private _storyTreeRootDetailsStore: StoryTreeRootDetailsStore
  ) {}

  async execute(request: RebindTreeNodeRequest): Promise<StoryCard> {
    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      throw new Error(``);
    }

    const node = tree.getNodeById(request.nodeId);

    if (!node) {
      throw new Error(``);
    }

    tree.removeById(request.nodeId);
    
    // The insert method needs to return inserted node object.
    tree.insert(
      node,
      request.parentNodeId,
      request.placeBeforeNodeId
        ? {
          afterOrBefore: 'before',
          nodeId: request.placeBeforeNodeId
        }
        : undefined
    );

    const persistedTree = await this._treeRepo.save(tree);

    this._storyTreeRootDetailsStore.set({
      data: persistedTree,
      isError: false,
      isLoading: false
    });
    
    return Promise.resolve(node);
  }
}
