import StoryTreeInfo from '@/entities/StoryTreeInfo';
import { StoryTreeInfoLocalStorageModel } from '../models/StoryTreeInfoLocalStorageModel';

export class StoryTreeInfoLocalStorageMap {
  static toDomainModel(localStorageModel: StoryTreeInfoLocalStorageModel): StoryTreeInfo {
    return new StoryTreeInfo({
      title: localStorageModel.title
    }, localStorageModel.id);
  }

  static toLocalStorageModel(domainModel: StoryTreeInfo): StoryTreeInfoLocalStorageModel {
    return {
      id: domainModel.id,
      title: domainModel.title
    };
  }
}
