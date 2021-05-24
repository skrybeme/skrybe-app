import { AsyncMaybe } from "@/common/types";
import StoryCard from "@/entities/StoryCard";
import Tag from "@/entities/Tag";
import { IExecutable, IStoryTreeRepo } from "@/interfaces";
import { InsertTreeNodeRequest } from "@/interfaces/requests";

export class InsertTreeNodeUseCase implements IExecutable<
  InsertTreeNodeRequest,
  AsyncMaybe<StoryCard>
> {
  constructor(private _treeRepo: IStoryTreeRepo) {}

  async execute(request: InsertTreeNodeRequest): AsyncMaybe<StoryCard> {
    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      return Promise.resolve(null);
    }

    const card = new StoryCard({
      body: request.body,
      header: request.header,
      tags: request.tags.map((tag) => new Tag({
        color: tag.color,
        label: tag.label
      })),
    });

    // @TODO
    // Insert should return inserted object.
    await tree.insert(card, request.parentNodeId, request.placeBeforeNodeId);

    await this._treeRepo.save(tree);

    return Promise.resolve(card);
  }
}
