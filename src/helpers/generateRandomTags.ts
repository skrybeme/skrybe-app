import Tag from '@/entities/Tag';
import { ColorType } from '@/entities/types';
import { randomOf } from '@/utils';
import { lorem } from 'faker';

export default function generateRandomTags(amount: number): Array<Tag> {
  // @FIXME
  // This should not be declared here.
  // We need a single source of truth (values of ColorType).
  const labels: Array<ColorType> = [
    'green',
    'yellow',
    'orange',
    'red',
    'purple',
    'magenta',
    'blue',
    'lightblue',
    'lightgreen',
    'pink',
    'darkblue',
    'grey'
  ];

  let out: any = [];

  for (let i = 0; i < amount; i++) {
    out.push(new Tag(randomOf<ColorType>(labels), lorem.word()));
  }

  return out;
}
