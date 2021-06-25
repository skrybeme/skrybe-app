import { AsyncMaybe, UuidType } from '@/common/types';
import { IExecutable, IStoryTreeRepo } from '@/interfaces';
import StoryCard from '@/entities/StoryCard';

export interface GetCardByIdRequest {
  id: UuidType;
  treeId: UuidType;
}

export class GetCardByIdUseCase implements IExecutable<
  GetCardByIdRequest,
  AsyncMaybe<StoryCard>
> {
  constructor(private _treeRepo: IStoryTreeRepo) {}

  async execute(request: GetCardByIdRequest): AsyncMaybe<StoryCard> {
    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      return Promise.resolve(null);
    }

    return tree?.getNodeById(request.id);
  }
}
