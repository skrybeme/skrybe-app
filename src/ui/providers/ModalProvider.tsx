import React, { PropsWithChildren, ReactNode, useRef, useState } from 'react';
import { Modal } from '../components/Modal';
import { Overlay } from '../components/Overlay';
import { useSmoothToggle } from '../hooks';
import ModalContext from './ModalContext';

export default function ModalProvider({ children }: PropsWithChildren<{}>): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const { isVisible } = useSmoothToggle(isOpen);

  const dynamicComponent = useRef<ReactNode | undefined>(undefined);

  return (
    <ModalContext.Provider value={{
      hide() {
        setIsOpen(false);
      },
      show(component: ReactNode) {
        dynamicComponent.current = component;

        setIsOpen(true);
      }
    }}>
      <Overlay isActive={isOpen}>
        <Modal isVisible={isVisible}>
          {dynamicComponent.current}
        </Modal>
      </Overlay>
      {children}
    </ModalContext.Provider>
  );
}
