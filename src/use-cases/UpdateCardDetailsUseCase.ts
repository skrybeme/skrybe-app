import { Maybe } from '@/common/types';
import { IExecutable, IStoryTreeRepo, ITagRepo } from '@/interfaces';
import { UpdateCardDetailsRequest } from '@/interfaces/requests';
import { CardDetailsStore } from '@/store';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

export class UpdateCardDetailsUseCase implements IExecutable<UpdateCardDetailsRequest> {
  constructor(
    private _tagRepo: ITagRepo,
    private _treeRepo: IStoryTreeRepo,
    private _storyTreeRootDetailsStore: StoryTreeRootDetailsStore,
    private _cardDetailsStore: CardDetailsStore
  ) {}

  private _saveResult(tree: Maybe<Tree<StoryCard>>, result: Maybe<StoryCard>): void {
    if (tree) {
      this._storyTreeRootDetailsStore.set({
        data: tree,
        isError: false,
        isLoading: false
      });
    }

    this._cardDetailsStore.set({
      data: result,
      isError: false,
      isLoading: false
    });
  }

  async execute(request: UpdateCardDetailsRequest): Promise<void> {
    // @TODO
    // Operations on tree nodes should be handled by TreeNodeRepo.
    // Additionaly, a TreeNode object should have access to the tree.
    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      this._saveResult(tree, null);

      return;
    }

    const node = tree.getNodeById(request.id);
      
    if (!node) {
      this._saveResult(tree, null);

      return;
    }

    node.body = request.body !== undefined ? request.body : node.body;
    node.header = request.header !== undefined ? request.header : node.header;

    if (request.tags) {
      // @TODO Optimize this with repo query.
      const tags = await this._tagRepo.getCollection();

      node.setTags(tags.filter(({ id }) => request.tags?.includes(id)));
    }

    await this._treeRepo.save(tree);

    this._saveResult(tree, node);
  }
}
