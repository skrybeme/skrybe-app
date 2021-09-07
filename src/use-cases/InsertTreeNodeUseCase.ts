import { IExecutable, IStoryTreeRepo } from '@/interfaces';
import { InsertTreeNodeRequest } from '@/interfaces/requests';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import StoryCard from '@/entities/StoryCard';
import Tag from '@/entities/Tag';
import { AsyncMaybe } from '@/common/types';

export class InsertTreeNodeUseCase implements IExecutable<
  InsertTreeNodeRequest,
  AsyncMaybe<StoryCard>
> {
  constructor(
    private _treeRepo: IStoryTreeRepo,
    private _storyTreeRootDetailsStore: StoryTreeRootDetailsStore
  ) {}

  async execute(request: InsertTreeNodeRequest): AsyncMaybe<StoryCard> {
    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      return Promise.resolve(null);
    }

    const card = new StoryCard({
      body: request.body,
      header: request.header,
      tags: request.tags.map((tag) => new Tag({
        color: tag.color,
        label: tag.label
      }))
    });

    // @TODO insert should return inserted card.
    tree.insert(card, request.parentNodeId, request.place);

    const persistedTree = await this._treeRepo.save(tree);

    this._storyTreeRootDetailsStore.set({
      data: persistedTree,
      isError: false,
      isLoading: false
    });

    return Promise.resolve(card);
  }
}
