import { AsyncMaybe } from "@/common/types";
import StoryCard from "@/entities/StoryCard";
import Tree from "@/entities/Tree";
import { IExecutable, IStoryTreeRepo } from "@/interfaces";
import { GetTreeRequest } from "@/interfaces/requests";

export class GetTreeUseCase implements IExecutable<GetTreeRequest, AsyncMaybe<Tree<StoryCard>>> {
  constructor(private _treeRepo: IStoryTreeRepo) {}

  execute(request: GetTreeRequest): AsyncMaybe<Tree<StoryCard>> {
    return this._treeRepo.getOneBy({ storyTreeInfoId: request.storyTreeInfoId });
  }
}
