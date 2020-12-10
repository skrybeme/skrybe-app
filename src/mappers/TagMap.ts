import { ITag } from '@/interfaces';
import { TagViewModel } from '@/interfaces/view-models';

export default class TagMap {
  static toViewModel(domainModel: ITag): TagViewModel {
    return {
      color: domainModel.color,
      id: domainModel.id,
      label: domainModel.label
    };
  }
}
