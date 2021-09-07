import StoryCard from '@/entities/StoryCard';
import { StoryCardViewModel } from '@/interfaces/view-models';
import TagMap from './TagMap';

export default class StoryCardMap {
  static toViewModel(domainModel: StoryCard): StoryCardViewModel {
    return {
      body: domainModel.body,
      header: domainModel.header,
      id: domainModel.id,
      tags: domainModel.tags.map(TagMap.toViewModel)
    };
  }
}
