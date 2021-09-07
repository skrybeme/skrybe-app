import React from 'react';
import { EditableTagsPickerProps } from '@/interfaces/props';
import { useEffectAfterMount, useToggle } from '@/ui/hooks';
import { PickerItem, PickerTab, Picker_VariantA as Picker } from '@/ui/components/Picker';
import { EditableTags } from '@/ui/components/EditableTags';
import { TagLine } from '@/ui/components/TagLine';
import * as S from './styles';

export function EditableTagsPicker({
  initialValue = [],
  onClose,
  tags
}: EditableTagsPickerProps): React.ReactElement<EditableTagsPickerProps> {  
  const { close, isOpen, toggle } = useToggle();

  const [value, setValue] = React.useState<Array<string>>(initialValue);

  const handleTagClick = React.useCallback((tag) => {
    setValue((state) => {
      const newState = state.filter((id) => id !== tag.id);

      if (newState.length === state.length) {
        newState.push(tag.id);
      }

      return newState;
    });
  }, [setValue]);

  const selectedTags = React.useMemo(
    () => tags.filter((tag) => value.includes(tag.id)),
    [tags, value]
  );

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffectAfterMount(() => {
    if (isOpen) {
      return;
    }

    onClose?.(selectedTags);
  }, [isOpen]);

  return (
    <S.EditableTagsPicker>
      <S.ClickableTrigger
        data-testid="clickable-trigger"
        onClick={toggle}
      >
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
