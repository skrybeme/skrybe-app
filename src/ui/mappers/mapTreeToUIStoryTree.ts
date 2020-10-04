import { Maybe } from '@/common/types';
import { defaultNestedCardTree } from '@/data';
import { ITree, UIStoryTree } from '@/interfaces';

export default function mapTreeToUIStoryTree(tree: ITree): Maybe<UIStoryTree> {
  // @FIXME
  // This is a temporary implementation.
  return defaultNestedCardTree;
}
