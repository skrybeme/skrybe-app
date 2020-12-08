import { ITag } from '@/interfaces';
import { UuidType } from '@/common/types';
import { generateUuid } from '@/utils';
import { TagColor } from './enums';
import ITagProps from '@/interfaces/ITagProps';

class Tag implements ITag {
  private constructor(
    public _props: ITagProps,
    private _id: UuidType
  ) {}

  static create(props?: ITagProps, id: UuidType = generateUuid()) {
    return new Tag({
      color: TagColor.WHITE,
      label: "",
      ...props
    }, id);
  }

  get color(): TagColor {
    return this._props.color;
  }

  get id(): UuidType {
    return this._id;
  }

  get label(): string {
    return this._props.label;
  }

  set color(value: TagColor) {
    this._props.color = value;
  }

  set label(value: string) {
    this._props.label = value;
  }
}

export default Tag;
