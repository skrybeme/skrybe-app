import StoryCard from '@/entities/StoryCard';
import Tag from '@/entities/Tag';
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

const tagCollection = [
  new Tag(),
  new Tag(),
  new Tag(),
  new Tag()
];

export { root, rootChild, tagCollection, tree }
