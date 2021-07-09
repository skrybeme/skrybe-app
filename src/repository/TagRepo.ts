import { AsyncMaybe, UuidType } from '@/common/types';
import { ITagRepo } from '@/interfaces';
import Tag from '@/entities/Tag';
import { TagColor } from '@/entities/enums';

export default class TagRepo implements ITagRepo {
  private _tagCollection: Array<Tag> = [
    new Tag({
      color: TagColor.RED,
      label: 'blue'
    }),
    new Tag({
      color: TagColor.ORANGE,
      label: 'orange'
    }),
    new Tag({
      color: TagColor.YELLOW,
      label: 'yellow'
    }),
    new Tag({
      color: TagColor.GREEN,
      label: 'green'
    }),
    new Tag({
      color: TagColor.BLUE,
      label: 'blue'
    }),
    new Tag({
      color: TagColor.VIOLET,
      label: 'violet'
    }),
    new Tag({
      color: TagColor.PURPLE,
      label: 'purple'
    })
  ];

  constructor() {}

  getById(id: UuidType): AsyncMaybe<Tag> {
    return Promise.resolve(this._tagCollection.find((tag) => tag.id === id) || null);
  }

  getCollection(): Promise<Array<Tag>> {
    return Promise.resolve(this._tagCollection);
  }

  save(tag: Tag): Promise<Tag> {
    return Promise.resolve(tag);
  }
}
