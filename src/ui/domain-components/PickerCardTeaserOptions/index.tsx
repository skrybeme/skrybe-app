import React, { useCallback, useEffect } from 'react';
import { PickerCardTeaserOptionsProps } from '@/interfaces/props';
import { ButtonOptions_VariantA } from '@/ui/domain-components/ButtonOptions';
import { PickerItem, PickerTab, Picker_VariantA } from '@/ui/components/Picker';
import { useToggle } from '@/ui/hooks';
import * as S from './styles';

export function PickerCardTeaserOptions_VariantA({
  onGenerateChildren,
  onRemoveNode,
  onToggle
}: PickerCardTeaserOptionsProps): JSX.Element {
  const { close, isOpen, toggle } = useToggle();

  const emitGenerateChildren = useCallback(() => {
    onGenerateChildren?.();
    close();
  }, [close, onGenerateChildren]);

  const emitRemoveNode = useCallback(() => {
    onRemoveNode?.();
    close();
  }, [close, onRemoveNode]);

  useEffect(() => {
    onToggle?.(isOpen);
  }, [isOpen]);

  return (
    <S.PickerCardTeaserOptions_VariantA>
      <S.Trigger>
        <ButtonOptions_VariantA onClick={toggle} />
      </S.Trigger>
      <Picker_VariantA
        isOpen={isOpen}
        left
        onClickOutside={close}
      >
        <PickerTab name="default">
          <PickerItem
            hoverable
            onClick={emitGenerateChildren}
          >
            Generate subcards
          </PickerItem>
          <PickerItem
            hoverable
            onClick={open => open('remove')}
          >
            Remove card...
          </PickerItem>
        </PickerTab>
        <PickerTab name="remove">
          <PickerItem>
            Are you sure you want to remove this card with all its subcards?
          </PickerItem>
          <PickerItem
            hoverable
            onClick={emitRemoveNode}
          >
            Yes
          </PickerItem>
          <PickerItem
            hoverable
            onClick={open => open('default')}
          >
            Cancel
          </PickerItem>
        </PickerTab>
      </Picker_VariantA>
    </S.PickerCardTeaserOptions_VariantA>
  );
}
