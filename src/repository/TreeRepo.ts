import { Maybe, UuidType } from "@/common/types";
import { ITreeDataSource, ITree, ITreeRepo } from "@/interfaces";

export default function createTreeRepo(dataSource: ITreeDataSource): ITreeRepo {
  return {
    getTreeById(id: UuidType): Maybe<ITree> {
      return dataSource.fetchTreeById(id);
    }
  }
}