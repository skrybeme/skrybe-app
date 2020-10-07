import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Label, Tag } from '@/ui/components/Elements';

function Tags(props: any): JSX.Element {
  const [isExtended, setIsExtended] = useState(false);

  return (
    <S.Context>
      <Label
        icon="fas fa-tag"
        label="Tags"
        isClickable={true} onClick={() => setIsExtended(!isExtended)}
        className={isExtended ? 'is-active' : ''}
      />
      <S.Panel isExtended={isExtended}>
        <Tag label="Main storyline" color="#559955" />
        <Tag label="Character: Dorothy" color="#995555" />
        <Tag label="No action" color="#555599" />
        <div style={{ marginTop: '10px', padding: '10px 10px', display: 'flex', justifyContent: 'center', backgroundColor: '#fff', color: '#999' }}>
          <span>+ Add new tag</span>
        </div>
      </S.Panel>
    </S.Context>
  );
}

export default Tags;
