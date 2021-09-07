import StoryTreeInfo from '@/entities/StoryTreeInfo';
import { StoryTreeInfoViewModel } from '@/interfaces/view-models';

export default class StoryTreeInfoMap {
  static toViewModel(domainModel: StoryTreeInfo): StoryTreeInfoViewModel {
    return {
      id: domainModel.id,
      title: domainModel.title
    };
  }
}
