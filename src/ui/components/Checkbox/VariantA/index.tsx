import { useEffectAfterMount } from '@/ui/hooks';
import React from 'react';
import * as S from './styles';

export type CheckboxChangeHandler = (value: boolean) => void;

export interface CheckboxProps extends React.PropsWithChildren<{}> {
  id: string;
  onChange?: CheckboxChangeHandler;
  value: boolean;
}

export function Checkbox_VariantA({
  children,
  id: idAttr,
  onChange,
  value
}: CheckboxProps): React.ReactElement<CheckboxProps> {
  const handleChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange?.(e.target.checked);
    },
    [onChange]
  );

  const [isChecked, setIsChecked] = React.useState(value);

  useEffectAfterMount(() => {
    setIsChecked(value);
  }, [value]);

  return (
    <S.Checkbox>
      <S.Input
        checked={isChecked}
        id={idAttr}
        onChange={handleChange}
        type="checkbox"
      />
      <S.Label htmlFor={idAttr}>
        {children}
      </S.Label>
    </S.Checkbox>
  );
}
