import { ITag } from '@/interfaces';
import { UuidType } from '@/common/types';
import { generateUuid } from '@/utils';
import { TagColor } from './enums';
import ITagProps from '@/interfaces/ITagProps';

class Tag implements ITag {
  private _id: UuidType;
  private _props: ITagProps;

  constructor(props?: ITagProps, id: UuidType = generateUuid()) {
    this._id = id;
    this._props = {
      color: TagColor.RED,
      label: "",
      ...props
    };
  }

  get color(): TagColor {
    return this._props.color || TagColor.RED;
  }

  get id(): UuidType {
    return this._id;
  }

  get label(): string {
    return this._props.label || "";
  }

  set color(value: TagColor) {
    this._props.color = value;
  }

  set label(value: string) {
    this._props.label = value;
  }
}

export default Tag;
