import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import defaultStoryTreeInfoCollection from './defaultStoryTreeInfoCollection';

const collection: Tree<StoryCard>[] = defaultStoryTreeInfoCollection.map((storyTreeInfo, index) => {
  if (index === 0) {
    const tree = new Tree<StoryCard>(
      { info: storyTreeInfo },
      'ba5ff9b6-c93c-4af9-b6d2-8e73168db61c'
    );

    tree.insert(new StoryCard({
      header: 'Your story begins here.',
      body: '',
      tags: []
    }, 'ad25244b-9d62-4506-9427-f5ee2e15b3e8'));
    
    tree.insert(new StoryCard({
      header: 'It can go in one direction.',
      body: '',
      tags: []
    }, 'b5db3f95-0c6e-474d-ac47-0adf68b16fa5'), 'ad25244b-9d62-4506-9427-f5ee2e15b3e8');
    
    tree.insert(new StoryCard({
      header: 'It can go the other direction.',
      body: '',
      tags: []
    }, '0373574e-3160-4b9e-9e4c-082c5abfa1eb'), 'ad25244b-9d62-4506-9427-f5ee2e15b3e8');
    
    tree.insert(new StoryCard({
      header: 'The other direction has one scenario.',
      body: '',
      tags: []
    }, '63a93d48-1040-4a8e-9a47-ef4bc3420e29'), '0373574e-3160-4b9e-9e4c-082c5abfa1eb');
    
    tree.insert(new StoryCard({
      header: 'And other scenario.',
      body: '',
      tags: []
    }, '5aef3981-b775-4232-b833-d94636079e2b'), '0373574e-3160-4b9e-9e4c-082c5abfa1eb');

    return tree;
  } else if (index === 1) {
    const tree = new Tree<StoryCard>(
      { info: storyTreeInfo },
      'b6ca02de-3758-4fb3-b401-1a72b9cad387'
    );

    tree.insert(new StoryCard({
      header: 'B',
      body: '',
      tags: []
    }, 'e2622447-b25a-442c-b86c-b8f54a179088'));

    return tree;
  } else if (index === 2) {
    const tree = new Tree<StoryCard>(
      { info: storyTreeInfo },
      'eae41908-57a8-46ef-addc-c8fc16001047'
    );

    tree.insert(new StoryCard({
      header: 'C',
      body: '',
      tags: []
    }, 'ddad082b-0d53-41d9-af58-253505aca2d0'));

    return tree;
  }

  const tree = new Tree<StoryCard>(
    { info: storyTreeInfo },
    '77a6c7e9-075d-449d-bdda-178a0f6343e2'
  );

  tree.insert(new StoryCard({
    header: 'D',
    body: '',
    tags: []
  }, '061e163b-f1b5-4390-aa50-efd4a77a7502'));

  return tree;
});

export default collection;
