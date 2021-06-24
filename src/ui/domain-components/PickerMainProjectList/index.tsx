import React from 'react';
import { Picker_VariantA, PickerTab, PickerItem } from '@/ui/components/Picker';
import { useToggle } from '@/ui/hooks';
import * as S from './styles';

function Item({ title, wordsCount, modifiedDate }): JSX.Element {
  return (
    <S.Item>
      <div className="head">
        {title}
      </div>
      <div className="caption">
        <span title={`${wordsCount} words`}>
          <i className="fas fa-align-left" /> &nbsp;{wordsCount}
        </span>
        <span title={`Last modified at ${modifiedDate}`}>
          <i className="far fa-clock" /> &nbsp;{modifiedDate}
        </span>
      </div>
    </S.Item>
  );
}

export function PickerMainProjectList(): JSX.Element {
  const { close, isOpen, toggle } = useToggle();

  return (
    <S.PickerMainProjectList
      isOpen={isOpen}
      onClick={toggle}
    >
      <S.Trigger>
        <S.Caption>
          Current project
        </S.Caption>
        <S.Title>
          New Untitled Project <i className="fas fa-caret-down" />
          {/* It Ain't An Another Yo Momma Joke <i className="fas fa-caret-down" /> */}
        </S.Title>
      </S.Trigger>
      <Picker_VariantA
        isOpen={isOpen}
        onClickOutside={close}
      >
        <PickerTab name="default">
          {/* <PickerItem styleless>
            <Item
              title="Gulp Fiction"
              wordsCount="4 321"
              modifiedDate="12 Sep 2019"
            />
          </PickerItem>
          <PickerItem styleless>
            <Item
              title="A Sad Story of Michael Bay"
              wordsCount="12 002"
              modifiedDate="31 Aug 2019"
            />
          </PickerItem>
          <PickerItem styleless>
            <Item
              title="Never Gonna Give You Up"
              wordsCount="950"
              modifiedDate="3 May 2019"
            />
          </PickerItem> */}
          <PickerItem styleless>
            <S.Item>
              <div className="head center">
                See all projects...
              </div>
            </S.Item>
          </PickerItem>
        </PickerTab>
      </Picker_VariantA>
    </S.PickerMainProjectList>
  );
}
