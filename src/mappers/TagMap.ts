import Tag from '@/entities/Tag';
import { TagViewModel } from '@/interfaces/view-models';

export default class TagMap {
  static toViewModel(domainModel: Tag): TagViewModel {
    return {
      color: domainModel.color,
      id: domainModel.id,
      label: domainModel.label
    };
  }
}
