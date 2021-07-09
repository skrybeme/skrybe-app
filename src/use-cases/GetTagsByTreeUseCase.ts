import { AsyncMaybe, UuidType } from '@/common/types';
import { IExecutable, ITagRepo } from '@/interfaces';
import Tag from '@/entities/Tag';

export interface GetTagsByTreeRequest {
  treeId: UuidType;
}

export class GetTagsByTreeUseCase implements IExecutable<
  GetTagsByTreeRequest,
  AsyncMaybe<Tag[]>
> {
  constructor(private _tagRepo: ITagRepo) {}

  async execute(_: GetTagsByTreeRequest): AsyncMaybe<Tag[]> {
    return this._tagRepo.getCollection();
  }
}
