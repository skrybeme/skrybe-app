import { IStoryCard, IStoryCardProps, ITag } from '@/interfaces';
import { UuidType } from '@/common/types';
import { generateUuid } from '@/utils';

class StoryCard implements IStoryCard {
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

  get body(): string {
    return this._props.body || "";
  }

  get header(): string {
    return this._props.header || "";
  }

  get id(): UuidType {
    return this._id;
  }

  get tags(): Array<ITag> {
    return this._props.tags || [];
  }

  set body(value: string) {
    this._props.body = value;
  }

  set header(value: string) {
    this._props.header = value;
  }

  addTag(tag: ITag): StoryCard {
    if (this._props.tags!.find(t => t.id === tag.id)) {
      throw Error(`Tree node cannot have the same tag added twice.`);
    }

    this._props.tags!.push(tag);

    return this;
  }

  removeTagById(id: UuidType): StoryCard {
    const index = this._props.tags!.findIndex((tag: ITag) => tag.id === id);

    if (index < 0) {
      throw new Error(
        `A tag with id "${id}" does not exist in card with id "${this.id}"`
      );
    }

    this._props.tags!.splice(index, 1);

    return this;
  }

  replaceTag(oldTagId: UuidType, newTag: ITag): StoryCard {
    const index = this._props.tags!.findIndex((tag: ITag) => tag.id === oldTagId);

    this._props.tags!.splice(index, 1, newTag);

    return this;
  }
}

export default StoryCard;
