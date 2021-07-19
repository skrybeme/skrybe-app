import StoryTreeInfo from '@/entities/StoryTreeInfo';
import { IExecutable } from '@/interfaces';

export interface IStoryTreeInfoRepo {
  getCollection(): Promise<StoryTreeInfo[]>;
}

export class GetStoryTreeInfoCollectionUseCase implements IExecutable<
  never,
  Promise<StoryTreeInfo[]>
> {
  constructor(private _storyTreeInfoRepo: IStoryTreeInfoRepo) {}

  async execute(): Promise<StoryTreeInfo[]> {
    return this._storyTreeInfoRepo.getCollection();
  }
}
