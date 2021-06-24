import { AsyncMaybe } from "@/common/types";
import StoryCard from "@/entities/StoryCard";
import { IStoryTreeRepo } from "@/interfaces";
import IExecutable from "@/interfaces/IExecutable";
import { GenerateChildrenTreeNodesRequest } from "@/interfaces/requests";

export class GenerateChildrenTreeNodesUseCase implements IExecutable<
  GenerateChildrenTreeNodesRequest,
  AsyncMaybe<Array<StoryCard>>
> {
  constructor(private _treeRepo: IStoryTreeRepo) {}

  public async execute(
    request: GenerateChildrenTreeNodesRequest
  ): AsyncMaybe<Array<StoryCard>> {
    const tree = await this._treeRepo.getById(request.treeId);

    if (!tree) {
      return Promise.resolve(null);
    }

    const parent = tree.getNodeById(request.parentNodeId);

    if (!parent) {
      return Promise.resolve(null);
    }
    
    const sentences = parent.body.match(/\b((?!=|\?|\.).)+(.)\b/g);

    let cards: Array<StoryCard> = [];

    sentences?.forEach((sentence: string) => {
      sentence = sentence.replace(/\s{2,}/g, ' ').replace(/\.$/, '')

      const card = new StoryCard({ header: sentence });

      tree!.insert(
        card,
        parent?.id,
        request.placeBeforeNodeId
          ? {
            afterOrBefore: 'before',
            nodeId: request.placeBeforeNodeId
          }
          : undefined
      );

      cards.push(card);
    });

    await this._treeRepo.save(tree);

    return Promise.resolve(cards);
  }
}
