import IRepo from './IRepo';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

interface IStoryTreeRepo extends IRepo<Tree<StoryCard>> {}

export default IStoryTreeRepo;
