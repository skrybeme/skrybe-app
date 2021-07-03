import React from 'react';
import { TagColor } from '@/entities/enums';
import * as S from './styles';

export interface EditableTagsProps {
  onClick?: (tag: {
    color: TagColor;
    id: string;
  }) => void;
  tags: Array<{
    color: TagColor;
    id: string;
  }>;
  values?: Array<string>;
}

// @TODO Read about approaches to default values in multiselect input components.
export function EditableTags({
  onClick,
  tags,
  values
}: EditableTagsProps): React.ReactElement<EditableTagsProps> {
  const handleClick = React.useCallback((tag) => () => {
    onClick?.(tag);
  }, [onClick]);

  console.log(tags)

  return (
    <S.EditableTags>
      {tags.map((tag) => (
        <S.TagButton
          className={values?.includes(tag.id) ? 'is-active' : ''}
          color={tag.color}
          data-testid="tag-color"
          key={tag.id}
          onClick={handleClick(tag)}
        />
      ))}
    </S.EditableTags>
  )
}
