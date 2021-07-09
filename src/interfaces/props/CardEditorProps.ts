import { TagViewModel } from '../view-models';

interface CardEditorProps {
  availableTags: TagViewModel[];
  body?: string;
  header?: string;
  onChange?: (value: { body: string, header: string }) => void;
}

export default CardEditorProps;
