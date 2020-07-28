import { ITag } from '@/interfaces';
import { UuidType } from '@/common/types';
import { generateUuid } from '@/helpers';

class Tag implements ITag {
  public id: UuidType | null;
  public color: string;
  public label: String;

  constructor() {
    this.id = generateUuid();
    this.color = '';
    this.label = '';
  }
}

export default Tag;
