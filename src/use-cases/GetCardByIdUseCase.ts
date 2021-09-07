import { Maybe, UuidType } from '@/common/types';
import { IExecutable, IStoryTreeRepo } from '@/interfaces';
import StoryCard from '@/entities/StoryCard';
import { CardDetailsStore } from '@/store';

export interface GetCardByIdRequest {
  id: UuidType;
  treeId: UuidType;
}

export class GetCardByIdUseCase implements IExecutable<GetCardByIdRequest> {
  constructor(
    private _treeRepo: IStoryTreeRepo,
    private _cardDetailsStore: CardDetailsStore
  ) {}

  private _saveResult(data: Maybe<StoryCard>) {
    this._cardDetailsStore.set({
      data,
      isError: false,
      isLoading: false
    });
  }

  async execute(request: GetCardByIdRequest): Promise<void> {
    this._cardDetailsStore.reset();

    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      this._saveResult(null);
    }

    const result = tree?.getNodeById(request.id);

    this._saveResult(result);
  }
}
