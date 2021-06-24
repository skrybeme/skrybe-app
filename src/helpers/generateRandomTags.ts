import Tag from '@/entities/Tag';
import { TagColor } from '@/entities/enums';
import { randomOf } from '@/utils';
import { lorem } from 'faker';

export default function generateRandomTags(amount: number): Array<Tag> {
  const colors = Object.keys(TagColor)

  const labels: Array<TagColor> = colors.map(color => TagColor[color]);

  let out: any = [];

  for (let i = 0; i < amount; i++) {
    out.push(new Tag({
      color: randomOf<TagColor>(labels),
      label: lorem.word()
    }));
  }

  return out;
}
