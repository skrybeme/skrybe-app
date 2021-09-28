import { Logo } from '@/ui/domain-components/Logo';
import {
  PickerNotifications_VariantA as PickerNotifications
} from '@/ui/domain-components/PickerNotifications';
import React from 'react';
import * as S from './styles';

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
          <PickerNotifications hasUnreadMessages />
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
