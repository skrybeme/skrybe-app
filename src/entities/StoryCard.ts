import { IStoryCard, ITag, ITreeNode } from '@/interfaces';
import { UuidType } from '@/common/types';

class StoryTreeNode implements IStoryCard {
  constructor(
    public header: string = '',
    public body: string = '',
    public tags: Array<ITag> = []) {
  }

  public addTag(tag: ITag): IStoryCard {
    if (this.tags.find(t => t.id === tag.id)) {
      throw Error(`Tree node cannot have the same tag added twice.`);
    }

    this.tags.push(tag);

    return this;
  }

  public removeTag(tag: ITag | UuidType): IStoryCard {
    this.tags = this.tags.filter(t => t != tag && t.id !== tag);

    return this;
  }

  public replaceTag(oldTag: ITag, newTag: ITag): IStoryCard {
    const index = this.tags.indexOf(oldTag);

    this.tags.splice(index, 1, newTag);

    return this;
  }

  public setBody(body: string): IStoryCard {
    this.body = body;

    return this;
  }

  public setHeader(header: string): IStoryCard {
    this.header = header;

    return this;
  }
}

export default StoryTreeNode;
