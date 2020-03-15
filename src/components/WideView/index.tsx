import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from '@/hooks';
import { selectNestedCardTree } from '@/store/selectors';
import * as S from './styles';

function Card(props) {
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
  }

  return (
    <S.CardContainer>
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
  const cardFadeRef: any = useRef(null);
  const nestedCardTree = useSelector(selectNestedCardTree());

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

  function renderCardContext(rootTreeNode: any, className: string = ''): JSX.Element {
    const { header, id, subcards, tags } = rootTreeNode;

    return (
      <S.CardContext className={className} key={id}>
        <Card header={header} tags={tags.map(t => t.color)} hasChildren={subcards.length > 0} handleClick={onClickCard} />
        {subcards.length > 0 && (
          <S.SubcardsContext>
            {subcards.map(card => renderCardContext(card, subcards.length === 1 ? 'only' : ''))}
          </S.SubcardsContext>
        )}
      </S.CardContext>
    );
  }

  return (
    <S.Context>
      {nestedCardTree.map(card => renderCardContext(card, 'root'))}
      <S.DynamicOverlay ref={cardFadeRef} />
    </S.Context>
  );
}

export default WideView;
