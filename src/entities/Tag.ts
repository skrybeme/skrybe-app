import { ITag } from '@/interfaces';
import { UuidType } from '@/common/types';
import { generateUuid } from '@/utils';
import { ColorType } from './types';

class Tag implements ITag {
  constructor(
    public color: ColorType = 'grey',
    public label: string = '',
    public id: UuidType = generateUuid()
  ) {}
}

export default Tag;
