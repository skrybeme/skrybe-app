import { AsyncMaybe } from "@/common/types";
import StoryCard from "@/entities/StoryCard";
import StoryTreeInfo from "@/entities/StoryTreeInfo";
import Tree from "@/entities/Tree";
import { InMemoryStoryTreeRepo } from "@/repository/InMemoryStoryTreeRepo";
import { lorem } from "faker";
import { GetTreeUseCase } from "./GetTreeUseCase";

describe(`GetTreeByIdUseCase`, () => {
  const tree = new Tree<StoryCard>({
    info: new StoryTreeInfo({ title: lorem.sentence() })
  });

  const inMemoryStoryTreeRepo = new InMemoryStoryTreeRepo([tree]);

  const getTree = new GetTreeUseCase(inMemoryStoryTreeRepo);

  it(
    `resolves with null if the tree with given info id does not exist in the repo`,
    async () => {
      const entry = await getTree.execute({ storyTreeInfoId: 'invalid-uuid' });

      expect(entry).toBeNull();
    }
  );

  it(
    `resolves with story tree domain model fetched by info id if it exists in the repo`,
    async () => {
      const entry = await getTree.execute({ storyTreeInfoId: tree.info!.id });

      expect(entry).toEqual(tree);
    }
  );
});
