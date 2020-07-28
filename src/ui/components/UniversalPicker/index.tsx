import React, { useRef, useState } from 'react';
import * as S from './styles';
import { useClickOutside } from '@/ui/hooks';

function Item(props) {
  const { title, wordsCount, modifiedDate } = props;

  return (
    <S.Item>
      <div className="head">
        {title}
      </div>
      <div className="caption">
        <span title={`${wordsCount} words`}>
          <i className="fas fa-align-left"></i> &nbsp;{wordsCount}
        </span>
        <span title={`Last modified at ${modifiedDate}`}>
          <i className="far fa-clock"></i> &nbsp;{modifiedDate}
        </span>
      </div>
    </S.Item>
  );
}

function List() {
  return (
    <S.List>
      <Item title="Blitzkrieg, Inc." wordsCount="4 321" modifiedDate="12 Sep 2019" />
      <Item title="A Sad Story of Michael Bay" wordsCount="12 002" modifiedDate="31 Aug 2019" />
      <Item title="Never Don't Gave Up" wordsCount="950" modifiedDate="3 May 2019" />
      <S.Item>
        <div className="head center">
          See all projects...
        </div>
      </S.Item>
    </S.List>
  );
}

function UniversalPicker() {
  const [isOpen, setIsOpen] = useState(false);

  const self = useRef(null);

  useClickOutside(self, () => setIsOpen(false));

  return (
    <S.Context isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} ref={self}>
      <S.Picker>
        <S.Caption>
          Current project
        </S.Caption>
        <S.Title>
          The Curious Case of Benjamin Button <i className="fas fa-caret-down"></i>
        </S.Title>
      </S.Picker>
      <List />
    </S.Context>
  );
}

export default UniversalPicker;
