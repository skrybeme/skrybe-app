import React, { useState } from 'react';
import * as S from './styles';

function Card(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { header, tags } = props;

  return (
    <S.CardContainer
      onClick={e => setIsOpen(!isOpen)}
      className={isOpen ? 'is-open' : ''}
    >
      <S.CardBody title="Edit this card">
        <header>
          {header}
        </header>
        <footer>
          {tags.map((tag: string) => <S.Tag color={tag} />)}
        </footer>
      </S.CardBody>
      <S.CardFooter title="Add subcards to this card">
        <span>
          + Add subcards...
        </span>
      </S.CardFooter>
    </S.CardContainer>
  );
}

function WideView() {
  return (
    <S.Context>
      <Card header="Michael was not even Bay that day." tags={['lightgray', 'green', 'magenta']} />
      <Card header="Some people said he was the greatest cheater of all time." tags={['red', 'orange']} />
      <Card header="The others claim that Michael's behaviour always has been bad." tags={['red', 'magenta']} />
      <Card header="And Michael had that one problem: he could not give a fuck." tags={['lightblue', 'brown']} />
    </S.Context>
  );
}

export default WideView;
