import { EditableProps } from '@/interfaces/props';
import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import * as S from './styles';

export function Editable({
  blurOnEnter = false,
  isDisabled = false,
  handleBlur,
  handleChange,
  handleFocus,
  placeholder,
  value
}: EditableProps): ReactElement<EditableProps> {
  const ref = useRef<HTMLDivElement>(null);

  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }

    handleBlur?.(e.target.innerHTML);
  }, [handleBlur]);

  const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }

    handleFocus?.(e.target.innerHTML);
  }, [handleFocus]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }

    handleChange?.(e.target.innerHTML);
  }, [handleChange]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (blurOnEnter && e.key === 'Enter') {
      ref.current?.blur();
      handleBlur?.(ref.current?.innerHTML || '');
    }
  }, [blurOnEnter, ref]);

  const onPaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
  
    const plainText = e.clipboardData.getData('text/plain');
  
    document.execCommand("insertHTML", false, plainText);

    handleChange?.(plainText);
  }, [handleChange]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.innerHTML = value || '';
  }, [ref, value]);

  return (
    <S.Editable
      contentEditable={!isDisabled}
      data-testid="editable"
      onBlur={onBlur}
      onDrop={onDrop}
      onFocus={onFocus}
      onInput={onChange}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      placeholder={placeholder}
      ref={ref}
    />
  );
}
