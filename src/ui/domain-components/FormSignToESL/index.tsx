import React from 'react';
import * as S from './styles';

export interface FormSignToESLProps {
  emailInputRef?: React.RefObject<HTMLInputElement>;
  error?: string;
  isLoading?: boolean;
  onCancel?: () => void;
  onSubmit?: (email: string) => void;
}

export function FormSignToESL({
  emailInputRef,
  error,
  isLoading,
  onCancel,
  onSubmit
}: FormSignToESLProps): React.ReactElement<FormSignToESLProps> {
  const [email, setEmail] = React.useState('');

  const handleSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    onSubmit?.(email);
  }, [email, onSubmit]);

  const handleInputChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setEmail(e.target.value);
    },
    []
  );

  return (
    <S.FormSignToESL onSubmit={handleSubmit}>
      {error && <S.Error>{error}</S.Error>}
      <S.EmailInput
        className={error && 'has-error'}
        onChange={handleInputChange}
        placeholder="your.email@address.com"
        ref={emailInputRef}
        type="email"
        value={email}
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
      {isLoading && (
        <S.Loader>
          <S.Spinner></S.Spinner>
        </S.Loader>
      )}
    </S.FormSignToESL>
  );
}
