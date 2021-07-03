import React, { useEffect } from 'react';
import { CardEditorProps } from '@/interfaces/props';
import { Editable } from '@/ui/components/Editable';
import { useHeaderVisibility } from '../useHeaderVisibility';
import { ScrollableContext } from '@/ui/components/Sidebar';
import { EditableTagsPicker } from '../../EditableTagsPicker';
import * as S from './styles';

export function CardEditor_VariantA({
  body = '',
  header = '',
  onChange
}: CardEditorProps): React.ReactElement {
  const [value, setValue] = React.useState({ body, header });

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
    [setValue, value]
  );

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
          <EditableTagsPicker />
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
