import Picker from '@/components/Picker';
import UniversalPicker from '@/components/UniversalPicker';
import React from 'react';
import * as S from './styles';

function Toolbar() {
  return (
    <S.Toolbar flex>
      <S.Flex>
        <S.Logo>
          <span>
            <i className="fab fa-scribd"></i>
            &nbsp;&nbsp;Skrybe
          </span>
        </S.Logo>
        <UniversalPicker />
      </S.Flex>
      <Picker />
    </S.Toolbar>
  );
}

export default Toolbar;
