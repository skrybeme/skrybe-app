import React from 'react';
import { EditableTagsPickerProps } from '@/interfaces/props';
import { useToggle } from '@/ui/hooks';
import { PickerItem, PickerTab, Picker_VariantA as Picker } from '@/ui/components/Picker';
import { EditableTags } from '@/ui/components/EditableTags';
import { TagColor } from '@/entities/enums';
import { TagLine } from '@/ui/components/TagLine';
import * as S from './styles';

export function EditableTagsPicker({}: EditableTagsPickerProps): React.ReactElement<EditableTagsPickerProps> {
  const { close, isOpen, toggle } = useToggle();

  const tags = [
    { color: TagColor.BLUE, id: '1', label: '1' },
    { color: TagColor.GREEN, id: '2', label: '2' },
    { color: TagColor.ORANGE, id: '3', label: '3' },
    { color: TagColor.PURPLE, id: '4', label: '4' },
    { color: TagColor.RED, id: '5', label: '5' },
    { color: TagColor.VIOLET, id: '6', label: '6' },
    { color: TagColor.YELLOW, id: '7', label: '7' },
  ];

  const [value, setValue] = React.useState<Array<string>>([]);

  const handleTagClick = React.useCallback((tag) => {
    setValue((state) => {
      const newState = state.filter((id) => id !== tag.id);

      if (newState.length === state.length) {
        newState.push(tag.id);
      }

      return newState;
    });
  }, [setValue]);

  const selectedTags = tags.filter((tag) => value.includes(tag.id))
  // const selectedTags = value.map((id) => tags.find((tag) => id === tag.id)!)

  return (
    <S.EditableTagsPicker>
      <S.ClickableTrigger onClick={toggle}>
        {!value.length && (
          <S.DefaultLabel>
            + Add tags
          </S.DefaultLabel>
        )}
        {value.length > 0 && (
          <TagLine tags={selectedTags} />
        )}
      </S.ClickableTrigger>
      <Picker
        left
        isOpen={isOpen}
        onClickOutside={close}
      >
        <PickerTab>
          <PickerItem styleless>
            <S.Popover>
              <EditableTags
                onClick={handleTagClick}
                tags={tags}
                values={value}
              />
            </S.Popover>
          </PickerItem>
        </PickerTab>
      </Picker>
    </S.EditableTagsPicker>
  );
}
