import ITag from './ITag';

interface IStoryCard {
  id: number;
  header: string;
  body: string;
  tags: Array<ITag>;
};

export default IStoryCard;
