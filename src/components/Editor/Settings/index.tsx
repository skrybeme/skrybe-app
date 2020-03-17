import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Label } from '@/components/Elements';

function RangePicker(props: any): JSX.Element {
  const { children } = props;

  return (
    <S.RangePickerContext>
      {/* <S.RangePicker>
        <S.RangePickerValue>
          70
        </S.RangePickerValue>
        <S.RangePickerControls>
          <div className="trace" />
          <div className="bullet" />
        </S.RangePickerControls>
      </S.RangePicker> */}
      <div>
        {children}
      </div>
    </S.RangePickerContext>
  );
}

function Settings(props: any): JSX.Element {
  const [isExtended, setIsExtended] = useState(false);

  return (
    <S.Context>
      <Label
        icon="fas fa-cog"
        label="Editor settings"
        isClickable={true} onClick={() => setIsExtended(!isExtended)}
        className={isExtended ? 'is-active' : ''}
      />
      {isExtended && (
        <S.Panel>
          <S.Item>
            <span>Characters in line</span>
            <RangePicker values={[50, 60, 70, 80, 100, 'max']}>
              <S.Control>70 <i className="fas fa-pen"></i></S.Control>
            </RangePicker>
          </S.Item>
          <S.Item>
            <span>Font</span>
            <S.Control>Cairo <i className="fas fa-pen"></i></S.Control>
          </S.Item>
          <S.Item>
            <span>Font size</span>
            <S.Control>17px <i className="fas fa-pen"></i></S.Control>
          </S.Item>
          <S.Item>
            <span>Line height</span>
            <S.Control>1,5 <i className="fas fa-pen"></i></S.Control>
          </S.Item>
        </S.Panel>
      )}
    </S.Context>
  );
}

export default Settings;
