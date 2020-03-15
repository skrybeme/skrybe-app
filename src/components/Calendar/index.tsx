import React from 'react';
import * as S from './styles';

function Calendar(props) {
  const { start = 1, items = [] } = props;

  const balls = new Array(start - 1).fill(null).concat(items);

  return (
    <S.Context>
      {balls.map((ball, i) => (
        ball
          ? <S.Ball key={i} opacity={ball.opacity} title={ball.label} />
          : <S.Ball key={i} opacity={0} />
      ))}
    </S.Context>
  );
}

export default Calendar;
