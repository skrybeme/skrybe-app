import { TagViewModel } from '../view-models';

export default interface EditableTagsPickerProps {
  initialValue?: string[];
  onClose?: (selected: TagViewModel[]) => void;
  tags: TagViewModel[];
}
