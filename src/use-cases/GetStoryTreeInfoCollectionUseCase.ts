import StoryTreeInfo from '@/entities/StoryTreeInfo';
import { IExecutable } from '@/interfaces';
import { StoryTreeInfoCollectionStore } from '@/store/StoryTreeInfoCollectionStore';

export interface IStoryTreeInfoRepo {
  getCollection(): Promise<StoryTreeInfo[]>;
}

export class GetStoryTreeInfoCollectionUseCase implements IExecutable<never> {
  constructor(
    private _storyTreeInfoRepo: IStoryTreeInfoRepo,
    private _storyTreeInfoCollectionStore: StoryTreeInfoCollectionStore
  ) {}

  async execute(): Promise<void> {
    const collection = await this._storyTreeInfoRepo.getCollection();

    this._storyTreeInfoCollectionStore.set({
      data: collection,
      isError: false,
      isLoading: false
    });
  }
}
