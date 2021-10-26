import React from 'react';
import * as S from './styles';
import { useContainer } from '@/ui/hooks';
import { ESLSubscriptionStore } from '@/store/ESLSubscriptionStore';
import * as SYMBOL from '@/container/symbols';
import { observer } from 'mobx-react-lite';

export interface FormSignToESLProps {
  emailInputRef?: React.RefObject<HTMLInputElement>;
  onCancel?: () => void;
  onChange?: (value: string) => void;
  onSubmit?: (email: string) => void;
  value: string;
}

export const FormSignToESL = observer(({
  emailInputRef,
  onCancel,
  onChange,
  onSubmit,
  value
}: FormSignToESLProps): React.ReactElement<FormSignToESLProps> => {
  const store = useContainer<ESLSubscriptionStore>(SYMBOL.store.ESLSubscriptionStore);

  const [error, setError] = React.useState(store.error?.message);

  React.useEffect(() => {
    setError(store?.error?.message);
  }, [store.error]);

  const handleSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();

      store?.signToESL(value);

      onSubmit?.(value);
    },
    [value, onSubmit]
  );

  const handleInputChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange?.(e.target.value);
    },
    []
  );

  const handleInputFocus = React.useCallback<React.FocusEventHandler<HTMLInputElement>>(
    (e) => {
      setError(undefined);
    },
    []
  );

  return (
    <S.FormSignToESL
      data-testid="form-sign-to-esl"
      onSubmit={handleSubmit}
    >
      {error && <S.Error>{error}</S.Error>}
      <S.EmailInput
        className={error ? 'has-error' : ''}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="your.email@address.com"
        ref={emailInputRef}
        type="email"
        value={value}
      />
      <S.ActionButtons>
        <S.Button
          className="primary"
          type="submit"
        >
          Sign up
        </S.Button>
        <S.Button
          onClick={onCancel}
          type="button"
        >
          Cancel
        </S.Button>
      </S.ActionButtons>
      {store.isLoading && (
        <S.Loader data-testid="form-sign-to-esl-loader">
          <S.Spinner />
        </S.Loader>
      )}
    </S.FormSignToESL>
  );
});
