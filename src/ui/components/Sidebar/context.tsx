import React from 'react';
import { useToggle } from '@/ui/hooks';
import { stub, stubFactory } from '@/utils';
import { Sidebar } from '.';
import { ISidebarContext } from '@/interfaces';

export const SidebarContext = React.createContext<ISidebarContext>({
  close: stubFactory(),
  isOpen: false,
  open: stubFactory(),
  setCardId: () => stub(),
  unsetComponent: stubFactory()
});

export function SidebarProvider({
  children
}: React.PropsWithChildren<{}>): React.ReactElement {
  const { close, isOpen, open } = useToggle(false);

  const [
    cardId,
    setCardId
  ] = React.useState<string | undefined>(undefined);

  const unsetComponent = React.useCallback(() => {
    setCardId(undefined);
  }, [setCardId]);

  return (
    <SidebarContext.Provider
      value={{
        close,
        cardId,
        isOpen,
        open,
        setCardId,
        unsetComponent
      }}
    >
      {children}
      <Sidebar />
    </SidebarContext.Provider>
  );
}
