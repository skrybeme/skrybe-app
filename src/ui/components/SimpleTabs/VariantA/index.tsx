import React from 'react';
import * as S from './styles';

export interface IdentifiableLabel {
  id: string;
  label: string;
}

export interface SimpleTabsProps {
  onChange?: (tab: IdentifiableLabel) => void;
  tabs: IdentifiableLabel[];
  value: string;
}

export function SimpleTabs_VariantA({
  onChange,
  tabs,
  value
}: SimpleTabsProps): React.ReactElement<SimpleTabsProps> {
  const handleTabButtonClick = React.useCallback((tab: IdentifiableLabel) => () => {
    onChange?.(tab);
  }, [onChange]);

  return (
    <S.SimpleTabs_VariantA>
      {tabs.map((tab) => (
        <S.TabButton
          className={value === tab.id ? 'is-active' : ''}
          onClick={handleTabButtonClick(tab)}
        >
          {tab.label}
        </S.TabButton>
      ))}
    </S.SimpleTabs_VariantA>
  );
}
