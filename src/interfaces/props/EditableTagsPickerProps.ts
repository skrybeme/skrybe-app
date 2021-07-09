import { TagViewModel } from '../view-models';

export default interface EditableTagsPickerProps {
  onClose?: (selected: TagViewModel[]) => void;
  tags: TagViewModel[];
}
