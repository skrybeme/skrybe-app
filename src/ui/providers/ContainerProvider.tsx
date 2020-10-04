import React from 'react';
import ContainerContext from './ContainerContext';

export default function ContainerProvider({ children, container }): JSX.Element {
  return (
    <ContainerContext.Provider value={{ container }}>
      {children}
    </ContainerContext.Provider>
  );
}
