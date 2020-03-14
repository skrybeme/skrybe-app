import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './styles';

function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect((): any => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function Card(props) {
  const [isOpen, setIsOpen] = useState(false);
  const windowSize = useWindowSize();
  const { handleClick, hasChildren, header, tags } = props;

  function onClickCard(e) {
    if (!handleClick) {
      return;
    }

    const scaleX = windowSize != undefined ? windowSize.width / e.target.offsetWidth : 1;
    const scaleY = windowSize != undefined ? windowSize.height / e.target.offsetHeight : 1;

    const targetX = (windowSize.width / 2) - 100;
    const targetY = (windowSize.height / 2) - 39;

    const boundingRect = e.target.getBoundingClientRect();

    const translateX = targetX - boundingRect.x;
    const translateY = targetY - boundingRect.y;

    handleClick({
      x: boundingRect.x,
      y: boundingRect.y,
      transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`
    });
    // setIsOpen(!isOpen);
  }

  return (
    <S.CardContainer className={isOpen ? 'is-open' : ''}>
      <S.CardBody
        onClick={onClickCard}
        title="Edit this card"
      >
        <header>
          {header}
        </header>
        <footer>
          {tags.map((tag: string) => <S.Tag color={tag} key={tag} />)}
        </footer>
      </S.CardBody>
      <S.CardFooter title="Add subcards to this card">
        {hasChildren && (
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ transform: 'rotate(180deg) translateY(5px)' }}>
            <path d="M20 30 L50 70 L80 30" stroke="#aaa" strokeWidth="2" fill="transparent" />
          </svg>
        )}
        {!hasChildren && (
          <span>
            + Add subcards...
          </span>
        )}
      </S.CardFooter>
    </S.CardContainer>
  );
}

function WideView() {
  const dispatch = useDispatch();
  const cardFadeRef = useRef();

  function onClickCard({ transform, x, y }) {
    if (!cardFadeRef) {
      return;
    }

    cardFadeRef.current.style.transform = transform;
    cardFadeRef.current.style.left = x + 'px';
    cardFadeRef.current.style.top = y + 'px';
    cardFadeRef.current.style.opacity = 1;

    setTimeout(() => {
      dispatch({ type: 'change_page', page: 'page-view' });
    }, 200);
  }

  return (
    <S.Context>
      <S.CardContext className="root">
        <Card header="Michael was not even Bay that day." tags={['lightgray', 'green', 'magenta']} hasChildren={true} handleClick={onClickCard} />
        <S.SubcardsContext>
          <S.CardContext>
            {/* <svg width="100%" height="60px" viewBox="0 0 100 100" style={{ position: 'absolute', top: '-55px' }}>
              <path d="M50 100 C50 0, 400 100, 400 0" stroke="#ccc" stroke-width="4" fill="transparent" />
            </svg> */}
            <Card header="Some people said he was the greatest cheater of all time." tags={['red', 'orange']} hasChildren={true} handleClick={onClickCard} />
            <S.SubcardsContext>
              <S.CardContext>
                <Card header="Some people said he was the greatest cheater of all time." tags={['red', 'orange']} handleClick={onClickCard} />
              </S.CardContext>
              <S.CardContext>
                <Card header="The others claim that Michael's behaviour always has been bad." tags={['red', 'magenta']} hasChildren={true} handleClick={onClickCard} />
                <S.SubcardsContext>
                  <S.CardContext>
                    <Card header="Some people said he was the greatest cheater of all time." tags={['red', 'orange']} handleClick={onClickCard} />
                  </S.CardContext>
                  <S.CardContext>
                    <Card header="The others claim that Michael's behaviour always has been bad." tags={['red', 'magenta']} handleClick={onClickCard} />
                  </S.CardContext>
                </S.SubcardsContext>
              </S.CardContext>
            </S.SubcardsContext>
          </S.CardContext>
          <S.CardContext>
            <Card header="The others claim that Michael's behaviour always has been bad." tags={['red', 'magenta']} hasChildren={true} handleClick={onClickCard} />
            <S.SubcardsContext>
            <S.CardContext>
                <Card header="And Michael had that one problem: he could not give a fuck." tags={['lightblue', 'brown']} handleClick={onClickCard} />
              </S.CardContext>
              <S.CardContext>
                <Card header="And Michael had that one problem: he could not give a fuck." tags={['lightblue', 'brown']} handleClick={onClickCard} />
              </S.CardContext>
            </S.SubcardsContext>
          </S.CardContext>
          <S.CardContext>
            <Card header="And Michael had that one problem: he could not give a fuck." tags={['lightblue', 'brown']} handleClick={onClickCard} />
          </S.CardContext>
          <S.CardContext>
            <Card header="And Michael had that one problem: he could not give a fuck." tags={['lightblue', 'brown']} hasChildren={true} handleClick={onClickCard} />
            <S.SubcardsContext>
              <S.CardContext className="only">
                <Card header="And Michael had that one problem: he could not give a fuck." tags={['lightblue', 'brown']} handleClick={onClickCard} />
              </S.CardContext>
            </S.SubcardsContext>
          </S.CardContext>
        </S.SubcardsContext>
      </S.CardContext>
      <div
        ref={cardFadeRef}
        style={{
          transition: 'opacity 0.1s, transform 0.2s ease-out',
          position: 'fixed',
          width: '200px',
          height: '78px',
          backgroundColor: '#fff',
          opacity: 0,
          zIndex: 1
        }}
      />
    </S.Context>
  );
}

export default WideView;
