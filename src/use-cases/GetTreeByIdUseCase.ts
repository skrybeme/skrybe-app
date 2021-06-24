import { AsyncMaybe } from "@/common/types";
import StoryCard from "@/entities/StoryCard";
import Tree from "@/entities/Tree";
import { IExecutable, IStoryTreeRepo } from "@/interfaces";
import { GetTreeByIdRequest } from "@/interfaces/requests";

export class GetTreeByIdUseCase implements IExecutable<GetTreeByIdRequest, AsyncMaybe<Tree<StoryCard>>> {
  constructor(private _treeRepo: IStoryTreeRepo) {}

  execute(request: GetTreeByIdRequest): AsyncMaybe<Tree<StoryCard>> {
    return this._treeRepo.getById(request.id);
  }
}
