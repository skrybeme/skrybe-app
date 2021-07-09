import { TagViewModel } from '../view-models';

interface CardEditorProps {
  availableTags: TagViewModel[];
  body?: string;
  header?: string;
  onChange?: (value: { body: string, header: string, tags: TagViewModel[] }) => void;
  tags: TagViewModel[];
}

export default CardEditorProps;
