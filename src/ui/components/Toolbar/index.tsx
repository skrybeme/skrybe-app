import Picker from '@/ui/components/Picker';
import UniversalPicker from '@/ui/components/UniversalPicker';
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
      <S.Flex>
        <S.Bullet title="Create new project">
          <i className="fas fa-plus"></i>
        </S.Bullet>
        <S.Bullet title="My generated stories">
          <i className="fas fa-book-open"></i>
        </S.Bullet>
        <S.Bullet title="Help">
          <i className="fas fa-question"></i>
        </S.Bullet>
        <Picker />
      </S.Flex>
    </S.Toolbar>
  );
}

export default Toolbar;
