import { UuidType } from '@/common/types';
import { StorySummaryDraft } from '@/entities/StorySummaryDraft';
import { IExecutable, IStoryTreeRepo } from '@/interfaces';
import { StorySummaryDraftPreviewStore } from '@/store/StorySummaryDraftPreviewStore';
import StoryCard from '@/entities/StoryCard';

export interface PreviewStorySummaryDraftRequest {
  storyTreeNodeIds: UuidType[];
  treeId: UuidType;
}

export class PreviewStorySummaryDraftUseCase implements IExecutable<
  PreviewStorySummaryDraftRequest
> {
  constructor(
    private _storyTreeRootRepo: IStoryTreeRepo,
    private _storySummaryDraftPreviewStore: StorySummaryDraftPreviewStore
  ) {}

  async execute(request: PreviewStorySummaryDraftRequest): Promise<void> {
    const tree = await this._storyTreeRootRepo.getById(request.treeId);

    if (!tree) {
      this._storySummaryDraftPreviewStore.set({
        data: null,
        isError: true,
        isLoading: false
      });

      return;
    }

    const storyTreeNodesMap = tree.getAllNodes();

    const cards = request.storyTreeNodeIds.map((id) => storyTreeNodesMap.get(id)) as StoryCard[];

    try {
      const data = new StorySummaryDraft({
        cards,
        title: tree.info?.title,
        tree
      });
  
      this._storySummaryDraftPreviewStore.set({
        data,
        isError: false,
        isLoading: false
      });
    } catch (_) {
      this._storySummaryDraftPreviewStore.set({
        data: null,
        isError: true,
        isLoading: false
      });
    }
  }
}
