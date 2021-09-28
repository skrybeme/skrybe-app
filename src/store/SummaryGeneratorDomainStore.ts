import { Maybe, UuidType } from '@/common/types';
import { ILoadable } from '@/interfaces';
import { StoryTreeViewModel, TagViewModel } from '@/interfaces/view-models';
import { CrawlDirection } from '@/use-cases/FilterStoryTreeNodesUseCase';
import { IGetTreeUseCase } from '@/use-cases/GetTreeUseCase';

export interface SelectableStoryTreeRootViewModel extends StoryTreeViewModel {
  children: Array<SelectableStoryTreeRootViewModel>;
  isSelected: boolean;
}

export interface SelectableTagViewModel extends TagViewModel {
  isSelected: boolean;
}

export interface ISummaryGeneratorDomainStore {
  applyLeavesOnly: (leavesOnly: boolean) => Promise<void>;
  applyNodes: (nodeIds: string[]) => Promise<void>;
  applyOrder: (order: CrawlDirection) => Promise<void>;
  applyTags: (tagIds: Maybe<string>[]) => Promise<void>;
  getStoryTreeRoot: (storyTreeInfoId: string) => Promise<void>;
  readonly leavesOnly: boolean;
  readonly order: CrawlDirection;
  readonly selectedStoryTreeNodeIds: string[];
  readonly storyTreeRoot: ILoadable<StoryTreeViewModel>;
  readonly tags: ILoadable<SelectableTagViewModel[]>;
}

export interface IFilterStoryTreeRootByLeavesUseCase {
  execute: (request: { storyTreeRootId: UuidType, leavesOnly: boolean }) => Promise<UuidType[]>;
}

export class SummaryGeneratorDomainStore implements ISummaryGeneratorDomainStore {
  private _leavesOnly: boolean = false;
  private _order: CrawlDirection = CrawlDirection.DEEP;
  private _selectedStoryTreeNodeIds: ILoadable<string[]> = {
    data: [],
    isError: false,
    isLoading: false
  };
  private _storyTreeRoot: ILoadable<SelectableStoryTreeRootViewModel> = {
    data: null,
    isError: false,
    isLoading: false
  };
  private _tags: ILoadable<SelectableTagViewModel[]> = {
    data: null,
    isError: false,
    isLoading: false
  }

  constructor(
    private _filterStoryTreeRootByLeaves: IFilterStoryTreeRootByLeavesUseCase,
    private _getStoryTreeRoot: IGetTreeUseCase
  ) {}

  get selectedStoryTreeNodeIds() {
    return this._selectedStoryTreeNodeIds.data || [];
  }

  get leavesOnly() {
    return this._leavesOnly;
  }

  get order() {
    return this._order;
  }

  get storyTreeRoot() {
    return this._storyTreeRoot;
  }

  get tags() {
    return this._tags;
  }

  async applyLeavesOnly(leavesOnly: boolean): Promise<void> {
    const result = await this._filterStoryTreeRootByLeaves.execute({
      leavesOnly,
      storyTreeRootId: this._storyTreeRoot.data?.id as UuidType,
    });

    if (!result) {
      this._selectedStoryTreeNodeIds.isError = true;
      this._selectedStoryTreeNodeIds.isLoading = false;

      return;
    }

    this._leavesOnly = leavesOnly;

    this._selectedStoryTreeNodeIds = {
      data: result,
      isError: false,
      isLoading: true
    };
  }

  async applyNodes(nodeIds: string[]) {}

  async applyOrder(order: CrawlDirection) {}

  async applyTags(tagIds: Maybe<string>[]) {}

  async getStoryTreeRoot(storyTreeInfoId: string): Promise<void> {
    this._storyTreeRoot.isLoading = true;

    const result = await this._getStoryTreeRoot.execute({ storyTreeInfoId });
  }
}
