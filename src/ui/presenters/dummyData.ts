import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { generateRandomTags } from '@/helpers';
import { lorem } from 'faker';

const tree = new Tree<StoryCard>();

const root = new StoryCard({
 body: lorem.paragraph(),
 header: lorem.sentence()
});

const rootChild = new StoryCard({
 body: lorem.paragraph(),
 header: lorem.sentence(),
 tags: generateRandomTags(2)
})

tree.insert(root);
tree.insert(rootChild);

export { root, rootChild, tree }
