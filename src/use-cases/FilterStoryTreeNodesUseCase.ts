import { Maybe, UuidType } from '@/common/types';
import { crawlBreadthFirst, crawlDeepFirst } from '@/entities/Crawler';
import { IExecutable, IStoryTreeRepo, ITreeNodeContext } from '@/interfaces';
import { FilteredStoryTreeNodesStore } from '@/store/FilteredStoryTreeNodesStore';
import StoryCard from '@/entities/StoryCard';

export enum CrawlDirection {
  BREATH = 'breath',
  DEEP = 'deep'
};

export interface FilterStoryTreeNodesRequest {
  direction: CrawlDirection;
  leafsOnly?: boolean;
  tagIds?: Maybe<UuidType>[];
  treeId: UuidType;
}

export class FilterStoryTreeNodesUseCase implements IExecutable<FilterStoryTreeNodesRequest> {
  constructor(
    private _storyTreeRootRepo: IStoryTreeRepo,
    private _filteredStoryTreeNodesStore: FilteredStoryTreeNodesStore
  ) {}

  async execute(request: FilterStoryTreeNodesRequest): Promise<void> {
    const tree = await this._storyTreeRootRepo.getById(request.treeId);

    if (!tree) {
      this._filteredStoryTreeNodesStore.set({
        data: null,
        isError: true,
        isLoading: false
      });

      return;
    }

    const crawlingFunction = request.direction === CrawlDirection.BREATH
      ? crawlBreadthFirst
      : crawlDeepFirst;

    const data: UuidType[] = [];
    
    crawlingFunction(tree, (nodeContext: ITreeNodeContext<StoryCard>) => {
      if (request.leafsOnly && nodeContext.childrenIds.length > 0) {
        return;
      }

      if (
        !request.tagIds
        || (request.tagIds?.includes('') && nodeContext.node.tags.length === 0)
      ) {
        data.push(nodeContext.node.id);

        return;
      }

      nodeContext.node.tags.forEach((tag) => {
        if (data.includes(nodeContext.node.id)) {
          return;
        }

        if (request.tagIds?.includes(tag.id)) {
          data.push(nodeContext.node.id);
        }
      });
    });

    this._filteredStoryTreeNodesStore.set({
      data,
      isError: false,
      isLoading: false
    });

    return;
  }
}
