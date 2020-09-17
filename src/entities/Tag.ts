import { ITag } from '@/interfaces';
import { UuidType } from '@/common/types';
import { generateUuid } from '@/helpers';

class Tag implements ITag {
  constructor(
    public id: UuidType = generateUuid(),
    public color: string,
    public label: string
  ) {}
}

export default Tag;
