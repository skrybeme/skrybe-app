import { Logo } from '@/ui/domain-components/Logo';
import React from 'react';
import * as S from './styles';

export function Toolbar(): React.ReactElement {
  return (
    <S.Toolbar>
      <S.Flex>
        <S.Hamburger id="hamburger">
          <span />
          <span />
          <span />
        </S.Hamburger>
        <S.LogoContainer>
          <Logo id="logo" />
        </S.LogoContainer>
        <S.ProfilePicture id="profile-picture">
          <span>
            TJ
          </span>
        </S.ProfilePicture>
      </S.Flex>
    </S.Toolbar>
  );
}
