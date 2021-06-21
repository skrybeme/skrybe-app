import React, { SVGAttributes } from 'react';
import * as S from './styles';

interface LogoProps extends SVGAttributes<SVGElement> {
  id: string;
}

function Logo({ id, ...rest }: LogoProps): React.ReactElement<LogoProps> {
  return (
    <svg
      {...rest}
      fill="none"
      height="30"
      id={id}
      viewBox="0 0 32 30"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 0L30.1913 20.25H6.80866L18.5 0Z"
        fill="#A795CF"
        fillOpacity="0.61"
      />
      <path
        d="M15.5 3L27.1913 23.25H3.80866L15.5 3Z"
        fill="#5B3DA2"
      />
      <path
        d="M13.5 3L25.1913 23.25H1.80866L13.5 3Z"
        fill="#A795CF"
        fillOpacity="0.61"
      />
    </svg>
  );
}

export function Toolbar(): JSX.Element {
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
