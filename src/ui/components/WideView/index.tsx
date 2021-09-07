import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from '@/ui/hooks';
import { selectNestedCardTree } from '@/ui/store/selectors';
import * as S from './styles';
import { CardTeaser } from '../CardTeaser/VariantA';
import { useTreeDetailsPresenter } from '@/ui/views/TreeDetails/presenter';

const Card = CardTeaser;

function WideView() {
  const dispatch = useDispatch();
  const cardOverlayRef: any = useRef(null);
  const nestedCardTree = useSelector(selectNestedCardTree());
  const windowSize = useWindowSize();

  const { root } = useTreeDetailsPresenter();

  function onClickCard(e) {
    if (!cardOverlayRef) {          
      return;
    }

    const scaleX = windowSize != undefined ? windowSize.width / e.target.offsetWidth : 1;
    const scaleY = windowSize != undefined ? windowSize.height / e.target.offsetHeight : 1;

    const targetX = (windowSize.width / 2) - 100;
    const targetY = (windowSize.height / 2) - 39;

    const boundingRect = e.target.getBoundingClientRect();

    const translateX = targetX - boundingRect.x;
    const translateY = targetY - boundingRect.y;

    cardOverlayRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
    cardOverlayRef.current.style.left = boundingRect.x + 'px';
    cardOverlayRef.current.style.top = boundingRect.y + 'px';
    cardOverlayRef.current.style.opacity = 1;

    setTimeout(() => {
      dispatch({ type: 'change_page', page: 'page-view' });
    }, 200);
  }

  function CardContext(props): JSX.Element {
    const [isExtended, setIsExtended] = useState(false);

    const { rootTreeNode, className = ''} = props;
    const { header, id, children, tags } = rootTreeNode;

    return (
      <S.CardContext className={className} key={id}>
        <S.Tentacle className="left">
          <i className="fas fa-plus"></i>
        </S.Tentacle>
        <Card
          header={header}
          tags={tags}
          handleClick={onClickCard}
        />
        <S.Tentacle className="right">
          <i className="fas fa-plus"></i>
        </S.Tentacle>
        <S.ButtonDelete>
          <i className="fas fa-trash"></i>
        </S.ButtonDelete>
        <S.CardFooter onClick={() => setIsExtended(!isExtended)}>
          {children.length > 0 && isExtended && (
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ transform: 'rotate(180deg) translateY(5px)' }}>
              <path d="M20 30 L50 70 L80 30" stroke="rgb(204, 204, 204)" strokeWidth="2" fill="transparent" />
            </svg>
          )}
          {children.length > 0 && !isExtended && (
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ transform: 'rotate(0) translateY(-5px)' }}>
              <path d="M20 30 L50 70 L80 30" stroke="rgb(204, 204, 204)" strokeWidth="2" fill="transparent" />
            </svg>
          )}
          {!children.length && (
            <div>
              <S.HorizontalTentacle>
                <S.Ball>
                  <i className="fas fa-plus"></i>
                </S.Ball>
                Add subcard
              </S.HorizontalTentacle>
              <S.HorizontalTentacle>
                <S.Ball>
                  <i className="fas fa-plus"></i>
                </S.Ball>
                Generate subcards...
              </S.HorizontalTentacle>
            </div>
          )}
        </S.CardFooter>
        {children.length > 0 && isExtended && (
          <S.SubcardsContext>
            {children.map(card => <CardContext rootTreeNode={card} className={children.length === 1 ? 'only' : ''} key={card.id} />)}
          </S.SubcardsContext>
        )}
      </S.CardContext>
    );
  }

  return (
    <S.Context>
      {!root.isLoading && <CardContext rootTreeNode={root.data} className="root" key={root.data!.id} />}
      <S.DynamicOverlay ref={cardOverlayRef} />
    </S.Context>
  );
}

export default WideView;
