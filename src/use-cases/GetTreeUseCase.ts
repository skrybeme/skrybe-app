import { IExecutable, IStoryTreeRepo } from '@/interfaces';
import { GetTreeRequest } from '@/interfaces/requests';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';

export class GetTreeUseCase implements IExecutable<GetTreeRequest> {
  constructor(
    private _treeRepo: IStoryTreeRepo,
    private _storyTreeRootDetailsStore: StoryTreeRootDetailsStore
  ) {}

  async execute(request: GetTreeRequest): Promise<void> {
    const data = await this._treeRepo.getOneBy({
      storyTreeInfoId: request.storyTreeInfoId
    });

    this._storyTreeRootDetailsStore.set({ data });
  }
}
