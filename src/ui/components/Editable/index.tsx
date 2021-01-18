import { EditableProps } from '@/interfaces/props';
import React, { useCallback, useEffect, useRef } from 'react';
import * as S from './styles';

export function Editable({
  blurOnEnter = false,
  isDisabled = false,
  handleBlur,
  handleChange,
  handleFocus,
  value
}: EditableProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    handleBlur?.(e.target.innerHTML);
  }, [handleBlur]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange?.(e.target.innerHTML);
  }, [handleChange]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (blurOnEnter && e.key === 'Enter') {
      ref.current?.blur();
    }
  }, [blurOnEnter, ref]);

  const onPaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
  
    const plainText = e.clipboardData.getData('text/plain');
  
    document.execCommand("insertHTML", false, plainText);
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.innerHTML = value;
  }, [ref, value]);

  return (
    <S.Editable
      contentEditable={!isDisabled}
      onBlur={onBlur}
      onChange={onChange}
      onDrop={onDrop}
      onFocus={handleFocus}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      ref={ref}
    />
  );
}
