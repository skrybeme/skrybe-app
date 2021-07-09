import { AsyncMaybe } from "@/common/types";
import StoryCard from "@/entities/StoryCard";
import { IExecutable, IStoryTreeRepo, ITagRepo } from "@/interfaces";
import { UpdateTreeNodeRequest } from "@/interfaces/requests";

export class UpdateTreeNodeUseCase implements IExecutable<
  UpdateTreeNodeRequest,
  AsyncMaybe<StoryCard>
> {
  constructor(private _tagRepo: ITagRepo, private _treeRepo: IStoryTreeRepo) {}

  async execute(request: UpdateTreeNodeRequest): AsyncMaybe<StoryCard> {
    // @TODO
    // Operations on tree nodes should be handled by TreeNodeRepo.
    // Additionaly, a TreeNode object should have access to the tree.
    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      return Promise.resolve(null);
    }

    const node = tree.getNodeById(request.id);
      
    if (!node) {
      return Promise.resolve(null);
    }

    node.body = request.body !== undefined ? request.body : node.body;
    node.header = request.header !== undefined ? request.header : node.header;

    if (request.tags) {
      // @TODO Optimize this with repo query.
      const tags = await this._tagRepo.getCollection();

      node.setTags(tags.filter(({ id }) => request.tags?.includes(id)));
    }

    await this._treeRepo.save(tree);

    return Promise.resolve(node);
  }
}
