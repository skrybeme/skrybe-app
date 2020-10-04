import { UuidType, AsyncMaybe } from '@/common/types';
import { ITree, ITreeDataSource } from '@/interfaces';

export default function createLocalStorageDataSource(): ITreeDataSource {
  return {
    fetchTreeById(id: UuidType): AsyncMaybe<ITree> {
      const trees = localStorage.getItem('trees') || [];

      if (!trees.hasOwnProperty(id)) {
        return Promise.reject();
      }

      return Promise.resolve(trees[id]);
    },
    save(tree: ITree): AsyncMaybe<ITree> {
      const trees = localStorage.getItem('trees') || [];

      // @ts-ignore
      trees[tree.id] = tree;

      // @ts-ignore
      localStorage.setItem("trees", trees);
  
      return Promise.resolve(tree);
    }
  };
}
