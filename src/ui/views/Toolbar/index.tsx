import { Logo } from '@/ui/domain-components/Logo';
import React from 'react';
import * as S from './styles';
import { Notifications } from '@/ui/views/Notifications';

export function Toolbar({ onHamburgerClick }: any): React.ReactElement {
  return (
    <S.Toolbar>
      <S.Flex>
        <S.Hamburger
          id="hamburger"
          onClick={onHamburgerClick}
        >
          <span />
          <span />
          <span />
        </S.Hamburger>
        <S.LogoContainer>
          <Logo id="logo" />
        </S.LogoContainer>
        <S.Flex>
          <Notifications />
          <S.ThemePicker>
            <i className="fas fa-palette"></i>
          </S.ThemePicker>
          <S.ProfilePicture id="profile-picture">
            <S.ProfilePictureImage>
              <span>
                TJ
              </span>
            </S.ProfilePictureImage>
          </S.ProfilePicture>
        </S.Flex>
      </S.Flex>
    </S.Toolbar>
  );
}
