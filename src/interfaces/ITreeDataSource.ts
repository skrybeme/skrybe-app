import { Maybe, UuidType } from "@/common/types";
import IDataSource from "./IDataSource";
import ITree from './ITree';

export default interface ITreeDataSource extends IDataSource {
  fetchTreeById(id: UuidType): Maybe<ITree>;
}
