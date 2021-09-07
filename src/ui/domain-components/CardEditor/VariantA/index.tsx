import React, { useEffect } from 'react';
import { CardEditorProps } from '@/interfaces/props';
import { Editable } from '@/ui/components/Editable';
import { useHeaderVisibility } from '../useHeaderVisibility';
import { ScrollableContext } from '@/ui/components/Sidebar';
import { EditableTagsPicker } from '../../EditableTagsPicker';
import * as S from './styles';
import { TagViewModel } from '@/interfaces/view-models';

export function CardEditor_VariantA({
  availableTags,
  body = '',
  header = '',
  onChange,
  tags
}: CardEditorProps): React.ReactElement {
  const [value, setValue] = React.useState({ body, header, tags });

  const sidebarContext = React.useContext(ScrollableContext);

  const ref = React.useRef(null);

  const { headerVisible } = useHeaderVisibility(ref, {
    containerRef: sidebarContext && sidebarContext.ref ? sidebarContext.ref : undefined,
    threshold: 0
  });

  const onEditableChange = React.useCallback(
    (party: 'body' | 'header') => (val: string) => {
      setValue((state) => ({
        ...state,
        [party]: val
      }));

      onChange?.({
        ...value,
        [party]: val
      });
    },
    [onChange, setValue, value]
  );

  const onTagsPickerClose = React.useCallback((tags: TagViewModel[]) => {
    setValue((state) => ({
      ...state,
      tags
    }));

    onChange?.({
      ...value,
      tags
    });
  }, [onChange, setValue, value]);

  useEffect(() => {
    setValue((state) => ({
      ...state,
      body
    }));
  }, [body]);

  useEffect(() => {
    setValue((state) => ({
      ...state,
      header
    }));
  }, [header]);

  useEffect(() => {
    setValue((state) => ({
      ...state,
      tags
    }));
  }, [tags]);

  return (
    <>
      <S.Fixed className={headerVisible ? "" : "visible"}>
        <S.ClippedEditableHeader data-testid="clipped-editable-header">
          <Editable
            handleBlur={onEditableChange('header')}
            placeholder="Untitled card"
            value={value.header || ""}
          />
        </S.ClippedEditableHeader>
      </S.Fixed>
      <S.Scrollable>
        <S.TagEditorContainer>
          <EditableTagsPicker
            initialValue={tags.map(({ id }) => id)}
            onClose={onTagsPickerClose}
            tags={availableTags}
          />
        </S.TagEditorContainer>
        <S.EditableHeader
          data-testid="main-editable-header"
          ref={ref}
        >
          <Editable
            handleBlur={onEditableChange('header')}
            placeholder="Untitled card"
            value={value.header || ""}
          />
        </S.EditableHeader>
        <S.EditableBody data-testid="editable-body">
          <Editable
            handleBlur={onEditableChange('body')}
            placeholder="Type here"
            value={body || ""}
          />
        </S.EditableBody>
      </S.Scrollable>
    </>
  );
}
