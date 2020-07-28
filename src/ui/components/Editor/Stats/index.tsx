import React, { useState, useEffect } from 'react';
import * as S from './styles';
import Calendar from '@/ui/components/Calendar';
import { Label } from '@/ui/components/Elements';

function Stats(props: any): JSX.Element {
  const [isExtended, setIsExtended] = useState(false);

  return (
    <S.Context>
      <Label
        icon="fas fa-chart-pie"
        label="Writing progress & stats"
        isClickable={true} onClick={() => setIsExtended(!isExtended)}
        className={isExtended ? 'is-active' : ''}
      />
      {isExtended && (
        <S.Panel>
          <Calendar
            start={3}
            items={
              new Array(30)
                .fill({ label: '' })
                .map(i => {
                  const w = Math.round(Math.random() * 2000) + 20;
                  return {...i, label: `July 15th, 2019 - ${w} words`, opacity: w/2000 }
                })
            }
          />
          <a style={{ marginTop: '20px', marginBottom: '20px', padding: '10px 20px', textAlign: 'center', display: 'block', fontSize: '17px' }}>
            See all months...
          </a>
        </S.Panel>
      )}
    </S.Context>
  );
}

export default Stats;
