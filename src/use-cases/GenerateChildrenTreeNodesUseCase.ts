import { AsyncMaybe } from '@/common/types';
import { IStoryTreeRepo } from '@/interfaces';
import { GenerateChildrenTreeNodesRequest } from '@/interfaces/requests';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import StoryCard from '@/entities/StoryCard';
import IExecutable from '@/interfaces/IExecutable';

export class GenerateChildrenTreeNodesUseCase implements IExecutable<
  GenerateChildrenTreeNodesRequest,
  AsyncMaybe<Array<StoryCard>>
> {
  constructor(
    private _treeRepo: IStoryTreeRepo,
    private _storyTreeRootDetailsStore: StoryTreeRootDetailsStore
  ) {}

  public async execute(
    request: GenerateChildrenTreeNodesRequest
  ): AsyncMaybe<Array<StoryCard>> {
    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      return Promise.resolve(null);
    }

    const parent = tree.getNodeById(request.parentNodeId);

    if (!parent) {
      return Promise.resolve(null);
    }
    
    const sentences = request.source === 'body'
      ? parent.body.match(/\b((?!=|\?|\.).)+(.)\b/g)
      : parent.header.match(/\b((?!=|\?|\.).)+(.)\b/g);

    let cards: Array<StoryCard> = [];

    sentences?.forEach((sentence: string) => {
      sentence = sentence.replace(/\s{2,}/g, ' ').replace(/\.$/, '')

      const card = new StoryCard({ header: sentence });

      tree!.insert(
        card,
        parent?.id,
        request.placeBeforeNodeId
          ? {
            afterOrBefore: 'before',
            nodeId: request.placeBeforeNodeId
          }
          : undefined
      );

      cards.push(card);
    });

    const persistedTree = await this._treeRepo.save(tree);

    this._storyTreeRootDetailsStore.set({
      data: persistedTree,
      isError: false,
      isLoading: false
    });

    return Promise.resolve(cards);
  }
}
