import React from 'react';
import { SidebarContext } from './context';
import { CardEditor } from '@/ui/views/CardEditor';
import { IScrollableContext } from '@/interfaces';
import * as S from './styles';

export const ScrollableContext = React.createContext<IScrollableContext>({
  ref: undefined
});

export function Sidebar(): React.ReactElement {
  const { close, cardId, isOpen, treeId } = React.useContext(SidebarContext);

  const left = React.useRef(null);
  const right = React.useRef(null);

  const [, forceUpdate] = React.useState({});

  React.useLayoutEffect(() => {
    forceUpdate({});
  }, [left, right]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <S.Sidebar>
      <S.Side right>
        <ScrollableContext.Provider value={{ ref: right }}>
          <S.Scrollable ref={right}>
            <CardEditor cardId={cardId} />
          </S.Scrollable>
        </ScrollableContext.Provider>
        <S.CloseButton
          data-testid="sidebar-button-close"
          onClick={close}
        >
          <span />
          <span />
        </S.CloseButton>
      </S.Side>
    </S.Sidebar>
  );
}
