import React from 'react';
import { PickerAccountSettings } from '@/ui/domain-components/PickerAccountSettings';
import { PickerMainProjectList } from '@/ui/domain-components/PickerMainProjectList';
import * as S from './styles';

export function Toolbar(): JSX.Element {
  return (
    <S.Toolbar flex>
      <S.Flex>
        <S.Logo>
          <span>
            <i className="fab fa-scribd"></i>
            &nbsp;&nbsp;Skrybe
          </span>
        </S.Logo>
        <PickerMainProjectList />
      </S.Flex>
      <S.Flex>
        <S.Bullet title="My generated stories">
          <i className="fas fa-plus"></i>
        </S.Bullet>
        <S.Bullet title="My generated stories">
          <i className="fas fa-book-open"></i>
        </S.Bullet>
        <S.Bullet title="Help">
          <i className="fas fa-question"></i>
        </S.Bullet>
        <PickerAccountSettings />
      </S.Flex>
    </S.Toolbar>
  );
}
