import React from 'react';
import { PickerAccountSettings } from '@/ui/domain-components/PickerAccountSettings';
import { PickerMainProjectList } from '@/ui/domain-components/PickerMainProjectList';
import * as S from './styles';

export function Toolbar(): JSX.Element {
  return (
    <S.Toolbar flex>
      <S.Flex>
        <S.HomeIcon>
          <span>
            <i className="fas fa-home"></i>
          </span>
        </S.HomeIcon>
        <PickerMainProjectList />
      </S.Flex>
      <S.Logo>
        <img
          src="/logo_v21.png"
          alt=""
        />
      </S.Logo>
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
