import { AsyncMaybe, UuidType } from "@/common/types";
import { ITree, ITreeDataSource, ITreeRepo } from "@/interfaces";

export default function createTreeRepo(dataSource: ITreeDataSource): ITreeRepo {
  return {
    getTreeById(id: UuidType): AsyncMaybe<ITree> {
      return dataSource.fetchTreeById(id);
    },
    save(tree: ITree): AsyncMaybe<ITree> {
      return dataSource.save(tree);
    }
  }
}
