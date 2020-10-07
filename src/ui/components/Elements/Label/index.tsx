import React from 'react';
import * as S from './styles';

export function Label(props: any): JSX.Element {
  const { className, icon, isClickable, label, onClick, title } = props;

  return (
    <S.Label
      className={className ? className : ''}
      isClickable={isClickable}
      onClick={onClick}
      title={title}
    >
      {icon && <i className={ icon }></i>}
      {label && <span className="title">{label}</span>}
      <i className="chevron fas fa-chevron-up"></i>
    </S.Label>
  );
}

export default Label;
