import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

const tree = Tree.create<StoryCard>();

tree.insert(StoryCard.create({
  header: 'Your story begins here.',
  body: '',
  tags: []
}, 'ad25244b-9d62-4506-9427-f5ee2e15b3e8'));

tree.insert(StoryCard.create({
  header: 'It can go in one direction.',
  body: '',
  tags: []
}, 'b5db3f95-0c6e-474d-ac47-0adf68b16fa5'), 'ad25244b-9d62-4506-9427-f5ee2e15b3e8');

tree.insert(StoryCard.create({
  header: 'It can go the other direction.',
  body: '',
  tags: []
}, '0373574e-3160-4b9e-9e4c-082c5abfa1eb'), 'ad25244b-9d62-4506-9427-f5ee2e15b3e8');

tree.insert(StoryCard.create({
  header: 'The other direction has one scenario.',
  body: '',
  tags: []
}, '63a93d48-1040-4a8e-9a47-ef4bc3420e29'), '0373574e-3160-4b9e-9e4c-082c5abfa1eb');

tree.insert(StoryCard.create({
  header: 'And other scenario.',
  body: '',
  tags: []
}, '5aef3981-b775-4232-b833-d94636079e2b'), '0373574e-3160-4b9e-9e4c-082c5abfa1eb');

export default tree;
