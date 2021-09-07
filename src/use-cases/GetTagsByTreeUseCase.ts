import { UuidType } from '@/common/types';
import { IExecutable, ITagRepo } from '@/interfaces';
import { ITagCollectionStore } from '@/store/TagCollectionStore';

export interface GetTagsByTreeRequest {
  treeId: UuidType;
}

export class GetTagsByTreeUseCase implements IExecutable<GetTagsByTreeRequest> {
  constructor(
    private _tagRepo: ITagRepo,
    private _tagCollectionStore: ITagCollectionStore
  ) {}

  async execute(_: GetTagsByTreeRequest): Promise<void> {
    const data = await this._tagRepo.getCollection();

    this._tagCollectionStore.set({
      data,
      isError: false,
      isLoading: false
    });
  }
}
