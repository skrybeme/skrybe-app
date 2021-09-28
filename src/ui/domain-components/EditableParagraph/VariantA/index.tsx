import { Button_VariantB } from '@/ui/components/Button/VariantB';
import { Editable } from '@/ui/components/Editable';
import React from 'react';
import * as S from './styles';

export type EditableParagraphSaveHandler = (value: string) => void;

export interface EditableParagraphProps {
  initialEditMode?: boolean;
  initialValue: string;
  onSave?: EditableParagraphSaveHandler;
  title: string;
}

export function EditableParagraph_VariantA({
  initialEditMode = false,
  initialValue,
  onSave,
  title
}: EditableParagraphProps): React.ReactElement<EditableParagraphProps> {
  const [editMode, setEditMode] = React.useState(initialEditMode);

  const [displayValue, setDisplayValue] = React.useState(initialValue);

  const [storedValue, setStoredValue] = React.useState(initialValue);

  React.useEffect(() => {
    if (displayValue === '') {
      setDisplayValue(initialValue);
    }
  }, [displayValue, initialValue]);

  const handleBlur = React.useCallback(() => {
    if (storedValue !== initialValue) {
      setDisplayValue('');
    }
  
    setEditMode(false);
  }, [initialValue, storedValue]);

  const handleChange = React.useCallback((value: string) => {
    setStoredValue(value);
  }, []);

  const handleFocus = React.useCallback(() => {
    setDisplayValue(storedValue);
    setEditMode(true);
  }, [storedValue]);

  const handleSave = React.useCallback(() => {
    onSave?.(initialValue);
  }, []);

  return (
    <S.EditableParagraph>
      {editMode && (
        <S.Header>
          <S.Headline>
            <span>
              You are editting card:
            </span>
            <span>
              {title}
            </span>
          </S.Headline>
          <Button_VariantB
            onClick={handleSave}
            upper
          >
            Save
          </Button_VariantB>
        </S.Header>
      )}
      <S.EditableContainer isEditState={editMode}>
        <Editable
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleFocus={handleFocus}
          value={displayValue}
        />
      </S.EditableContainer>
    </S.EditableParagraph>
  );
}
