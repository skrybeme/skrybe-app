import IStoryCard from './IStoryCard';

interface INestedStoryCard extends IStoryCard {
  subcards: Array<INestedStoryCard>;
};

export default INestedStoryCard;
