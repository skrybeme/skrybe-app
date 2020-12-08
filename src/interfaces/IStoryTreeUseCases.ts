import { AsyncMaybe, UuidType } from "@/common/types";

export default interface IStoryTreeUseCases<T, N> {
  getTreeById(id: UuidType): AsyncMaybe<T>;
  rebindTreeNode(
    treeId: UuidType,
    nodeId: UuidType,
    parentNodeId: UuidType,
    placeBeforeNodeId: UuidType
  ): Promise<N>;
}
