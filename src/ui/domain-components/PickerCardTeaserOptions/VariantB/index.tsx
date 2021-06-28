import React from 'react';
import { PickerCardTeaserOptionsProps } from '@/interfaces/props';
import { PickerItem, PickerTab, Picker_VariantA } from '@/ui/components/Picker';
import { useToggle } from '@/ui/hooks';
import * as S from './styles';
import { IPickerContext } from '@/interfaces';

export function PickerCardTeaserOptions_VariantB({
  onCardOpen,
  onGenerateChildren,
  onRemoveNode,
  onToggle
}: PickerCardTeaserOptionsProps): React.ReactElement<PickerCardTeaserOptionsProps> {
  const { close, isOpen, toggle } = useToggle();

  const emitGenerateChildrenFromBody = React.useCallback(
    (open: IPickerContext['open']) => {
      onGenerateChildren?.('body');
      open('default');
      close();
    },
    [close, onGenerateChildren]
  );

  const emitGenerateChildrenFromHeader = React.useCallback(
    (open: IPickerContext['open']) => {
      onGenerateChildren?.('header');
      open('default');
      close();
    },
    [close, onGenerateChildren]
  );

  const emitRemoveNode = React.useCallback(() => {
    onRemoveNode?.();
    close();
  }, [close, onRemoveNode]);

  const onCancel = React.useCallback((open: IPickerContext['open']) => {
    open('default');
    close();
  }, [close]);

  const onTriggerClick = React.useCallback(() => {
    toggle();
  }, [toggle]);

  const onCardOpenButtonClick = React.useCallback(() => {
    onCardOpen?.();
    close();
  }, [close, onCardOpen]);

  React.useEffect(() => {
    onToggle?.(isOpen);
  }, [isOpen]);

  return (
    <S.PickerCardTeaserOptions_VariantB data-testid="picker-card-options">
      <S.Trigger
        isOpen={isOpen}
        onClick={onTriggerClick}
      >
        <i className="fa fa-ellipsis-v" />
      </S.Trigger>
      <Picker_VariantA
        isOpen={isOpen}
        onClickOutside={onCancel}
      >
        <PickerTab name="default">
        <PickerItem
            hoverable
            onClick={onCardOpenButtonClick}
          >
            Open card
          </PickerItem>
          <PickerItem
            hoverable
            onClick={open => open('generate')}
          >
            Generate subcards...
          </PickerItem>
          <PickerItem
            hoverable
            onClick={open => open('remove')}
          >
            Remove card...
          </PickerItem>
        </PickerTab>
        <PickerTab name="generate">
          <PickerItem onClick={open => open('default')}>
            Back
          </PickerItem>
          <PickerItem
            hoverable
            onClick={emitGenerateChildrenFromBody}
          >
            Generate from body
          </PickerItem>
          <PickerItem
            hoverable
            onClick={emitGenerateChildrenFromHeader}
          >
            Generate from header
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
            onClick={onCancel}
          >
            Cancel
          </PickerItem>
        </PickerTab>
      </Picker_VariantA>
    </S.PickerCardTeaserOptions_VariantB>
  );
}
