import ITag from "./ITag";

interface IStoryCardProps {
  body?: string;
  header?: string;
  tags?: Array<ITag>;
};

export default IStoryCardProps;
