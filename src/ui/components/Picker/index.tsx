import React, { useCallback, useContext, useEffect, useState } from 'react';
import { PickerTabProps, PickerItemProps, PickerProps } from '@/interfaces/props';
import { PickerContext, PickerProvider } from '@/ui/providers';
import { Popover } from '@/ui/components/Popover';
import * as S from './styles';
import { IPickerContext } from '@/interfaces';

export function Picker_VariantA({ children, isOpen, left, onClickOutside }: PickerProps): JSX.Element {
  const handleOutsideClick = React.useCallback((open: IPickerContext['open']) => () => {
    onClickOutside(open);
  }, [onClickOutside]);

  return (
    <S.Picker_VariantA>
      <PickerProvider>
        <PickerContext.Consumer>
          {({ open }) => (
            <Popover
              isOpen={isOpen}
              left={left}
              onClickOutside={handleOutsideClick(open)}
            >
              {children}
            </Popover>
          )}
        </PickerContext.Consumer>
      </PickerProvider>
    </S.Picker_VariantA>
  );
}

export function PickerTab({ children, name = 'default' }: PickerTabProps): JSX.Element {
  const { openItemName } = useContext(PickerContext);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (openItemName === name) {
      setIsActive(true);
    } else if (isActive) {
      setIsActive(false);
    }
  }, [openItemName]);

  return (
    <S.PickerTab isActive={isActive}>
      {children}
    </S.PickerTab>
  );
}

export function PickerItem({
  children,
  hoverable = false,
  onClick,
  styleless = false
}: PickerItemProps): JSX.Element {
  const { open } = useContext(PickerContext);

  const handleClick = useCallback(() => {
    onClick?.(open);
  }, [onClick, open]);

  return (
    <S.PickerItem
      data-testid="picker-item"
      hoverable={hoverable}
      onClick={handleClick}
      styleless={styleless}
    >
      {children}
    </S.PickerItem>
  );
}
