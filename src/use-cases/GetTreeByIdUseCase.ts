import { IExecutable, IStoryTreeRepo } from '@/interfaces';
import { GetTreeByIdRequest } from '@/interfaces/requests';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';

export class GetTreeByIdUseCase implements IExecutable<GetTreeByIdRequest> {
  constructor(
    private _treeRepo: IStoryTreeRepo,
    private _storyTreeRootDetailsStore: StoryTreeRootDetailsStore
  ) {}

  async execute(request: GetTreeByIdRequest): Promise<void> {
    const data = await this._treeRepo.getById(request.id);

    this._storyTreeRootDetailsStore.set({ data });
  }
}
