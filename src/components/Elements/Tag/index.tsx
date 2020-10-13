import React from 'react';
import * as S from './styles';

function Tag(props: any): JSX.Element {
  const { color, label } = props;

  return (
    <S.Context color={color}>
      <span>{label}</span>     
      <span className="onhover">
        <i className="fas fa-pen"></i>
      </span>
    </S.Context>
  );
}

export default Tag;
