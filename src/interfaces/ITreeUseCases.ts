import { Maybe, UuidType } from "@/common/types";
import ITree from "./ITree";

export default interface ITreeUseCases {
  getTreeById(id: UuidType): Maybe<ITree>;
}
