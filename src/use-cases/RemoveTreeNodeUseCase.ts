import { AsyncMaybe } from "@/common/types";
import StoryCard from "@/entities/StoryCard";
import { IExecutable, IStoryTreeRepo } from "@/interfaces";
import { RemoveTreeNodeRequest } from "@/interfaces/requests";

export class RemoveTreeNodeUseCase implements IExecutable<
  RemoveTreeNodeRequest,
  AsyncMaybe<StoryCard>
> {
  constructor(private _treeRepo: IStoryTreeRepo) {}

  async execute(request: RemoveTreeNodeRequest): AsyncMaybe<StoryCard> {
    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      return Promise.resolve(null);
    }

    const node = tree.getNodeById(request.id);
      
    if (!node) {
      return Promise.resolve(null);
    }

    // The insert method needs to return inserted node object.
    await tree.removeById(node.id);

    await this._treeRepo.save(tree);

    return Promise.resolve(node);
  }
}
