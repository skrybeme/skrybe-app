import { AsyncMaybe, UuidType } from '@/common/types';
import { ITagRepo } from '@/interfaces';
import Tag from '@/entities/Tag';
import { TagColor } from '@/entities/enums';

export default class TagRepo implements ITagRepo {
  private _tagCollection: Array<Tag> = [
    new Tag({
      color: TagColor.RED,
      label: 'blue'
    }, '28704113-02e3-4d74-84cc-994e4caedeff'),
    new Tag({
      color: TagColor.ORANGE,
      label: 'orange'
    }, 'f607c85f-303d-49be-a4cc-274f897218cd'),
    new Tag({
      color: TagColor.YELLOW,
      label: 'yellow'
    }, '65c5bdf6-e6cb-454d-87f6-2861039363a9'),
    new Tag({
      color: TagColor.GREEN,
      label: 'green'
    }, '2af389f1-b827-431f-87b2-f76571f3af50'),
    new Tag({
      color: TagColor.BLUE,
      label: 'blue'
    }, '32e08724-853d-481d-a00f-79779bd4001b'),
    new Tag({
      color: TagColor.VIOLET,
      label: 'violet'
    }, 'f24affb8-adf2-4913-8083-0c2858363e68'),
    new Tag({
      color: TagColor.PURPLE,
      label: 'purple'
    }, '8da50226-b5a4-4a74-84fd-f516922e0dd5')
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
