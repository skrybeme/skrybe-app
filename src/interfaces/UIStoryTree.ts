import { UuidType } from "@/common/types";
import ITag from "./ITag";

export default interface UIStoryTree {
  id: UuidType;
  header: string;
  body: string;
  tags: Array<ITag>;
  children: Array<UIStoryTree>;
}
