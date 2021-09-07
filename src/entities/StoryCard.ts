import { IStoryCard, IStoryCardProps } from '@/interfaces';
import { UuidType } from '@/common/types';
import { generateUuid } from '@/utils';
import Tag from './Tag';

class StoryCard implements IStoryCard {
  private _id: UuidType;
  private _props: IStoryCardProps;

  constructor(props?: IStoryCardProps, id: UuidType = generateUuid()) {
    this._id = id;
    this._props = {
      body: '',
      header: '',
      ...props,
      tags: props?.tags || []
    };
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

  get tags(): Array<Tag> {
    return this._props.tags || [];
  }

  set body(value: string) {
    this._props.body = value;
  }

  set header(value: string) {
    this._props.header = value;
  }

  addTag(tag: Tag): StoryCard {
    if (this._props.tags!.find(t => t.id === tag.id)) {
      throw Error(`Tree node cannot have the same tag added twice.`);
    }

    this._props.tags!.push(tag);

    return this;
  }

  removeTagById(id: UuidType): StoryCard {
    const index = this._props.tags!.findIndex((tag: Tag) => tag.id === id);

    if (index < 0) {
      throw new Error(
        `A tag with id "${id}" does not exist in card with id "${this.id}"`
      );
    }

    this._props.tags!.splice(index, 1);

    return this;
  }

  replaceTag(oldTagId: UuidType, newTag: Tag): StoryCard {
    const index = this._props.tags!.findIndex((tag: Tag) => tag.id === oldTagId);

    this._props.tags!.splice(index, 1, newTag);

    return this;
  }

  setTags(tags: Tag[]): StoryCard {
    this._props.tags = tags;

    return this;
  }
}

export default StoryCard;
