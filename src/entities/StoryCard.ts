import { IIdentifiable, IStoryCard, IStoryCardProps, ITag } from '@/interfaces';
import { UuidType } from '@/common/types';
import { generateUuid } from '@/utils';

class StoryCard implements IStoryCard, IIdentifiable {
  private constructor(
    private _props: IStoryCardProps,
    private _id: UuidType
  ) {}

  static create(props?: IStoryCardProps, id: UuidType = generateUuid()): StoryCard {
    return new StoryCard({
      ...props,
      tags: props?.tags || []
    }, id);
  }

  get id(): UuidType {
    return this._id;
  }

  addTag(tag: ITag): IStoryCard {
    if (this._props.tags!.find(t => t.id === tag.id)) {
      throw Error(`Tree node cannot have the same tag added twice.`);
    }

    this._props.tags!.push(tag);

    return this;
  }

  removeTag(tag: ITag | UuidType): IStoryCard {
    this._props.tags = this._props.tags!.filter(t => t != tag && t.id !== tag);

    return this;
  }

  replaceTag(oldTag: ITag, newTag: ITag): IStoryCard {
    const index = this._props.tags!.indexOf(oldTag);

    this._props.tags!.splice(index, 1, newTag);

    return this;
  }

  setBody(body: string): IStoryCard {
    this._props.body = body;

    return this;
  }

  setHeader(header: string): IStoryCard {
    this._props.header = header;

    return this;
  }
}

export default StoryCard;
