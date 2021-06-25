import React, { useEffect } from 'react';
import { CardEditorProps } from '@/interfaces/props';
import { Editable } from '@/ui/components/Editable';
import { useHeaderVisibility } from '../useHeaderVisibility';
import * as S from './styles';

export function CardEditor_VariantA({
  body = '',
  header = '',
  onChange
}: CardEditorProps): React.ReactElement {
  const [value, setValue] = React.useState({ body, header });

  const ref = React.useRef(null);

  const { headerVisible } = useHeaderVisibility(ref, {
    threshold: 0
  });

  const onEditableChange = React.useCallback(
    (party: 'body' | 'header') => (value: string) => {
      setValue((state) => ({
        ...state,
        [party]: value
      }));
    },
    [setValue]
  );

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  return (
    <S.CardEditor_VariantA>
      <S.Fixed className={headerVisible ? "" : "visible"}>
        <S.Container>
          <S.ClippedEditableHeader data-testid="clipped-editable-header">
            <Editable
              handleBlur={onEditableChange('header')}
              placeholder="Untitled card"
              value={value.header || ""}
            />
          </S.ClippedEditableHeader>
        </S.Container>
      </S.Fixed>
      <S.Scrollable>
        <S.Container>
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
              value={body || ""}
            />
          </S.EditableBody>
        </S.Container>
      </S.Scrollable>
    </S.CardEditor_VariantA>
  );
}
