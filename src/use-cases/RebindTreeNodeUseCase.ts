import StoryCard from "@/entities/StoryCard";
import { IExecutable, IStoryTreeRepo } from "@/interfaces";
import { RebindTreeNodeRequest } from "@/interfaces/requests";

export class RebindTreeNodeUseCase implements IExecutable<
  RebindTreeNodeRequest,
  Promise<StoryCard>
> {
  constructor(private _treeRepo: IStoryTreeRepo) {}

  async execute(request: RebindTreeNodeRequest): Promise<StoryCard> {
    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      throw new Error(``);
    }

    const node = tree.getNodeById(request.nodeId);

    if (!node) {
      throw new Error(``);
    }

    tree.removeById(request.nodeId);
    
    // The insert method needs to return inserted node object.
    tree.insert(node, request.parentNodeId, request.placeBeforeNodeId);

    await this._treeRepo.save(tree);
    
    return Promise.resolve(node);
  }
}
