import React, { useCallback, useState } from 'react';
import ProviderContext from './PickerContext';

export default function PickerProvider({ children }): JSX.Element {
  const [openItemName, setOpenItemName] = useState<string>('default');

  const open = useCallback((itemName: string) => {
    console.log(itemName)
    setOpenItemName(itemName);
  }, [openItemName]);

  return (
    <ProviderContext.Provider value={{ open, openItemName }}>
      {children}
    </ProviderContext.Provider>
  );
}
