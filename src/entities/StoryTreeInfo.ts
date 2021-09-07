import { UuidType } from '@/common/types';
import { generateUuid } from '@/utils';

export interface IStoryTreeInfoProps {
  title: string;
}

export default class StoryTreeInfo {
  constructor(
    private _props: IStoryTreeInfoProps,
    private _id: UuidType = generateUuid()
  ) {}

  get id() {
    return this._id;
  }

  get title() {
    return this._props?.title;
  }

  set title(value: string) {
    this._props.title = value;
  }
}
