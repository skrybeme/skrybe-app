import React from 'react';
import * as S from './styles';

export interface NavProps {
  isOpen: boolean;
}

export function Nav({ isOpen }: NavProps): React.ReactElement {
  return (
    <S.Nav className={isOpen ? 'is-open' : ''}>
      <S.Container>
      <S.Flex>
          <S.GroupHeader>
            Story trees
          </S.GroupHeader>
          <S.AddIcon />
        </S.Flex>
        <S.List>
          <S.ListItem>
            <S.ItemLink>
              <S.ItemText>
                Once Upon a Time in Hollywood
              </S.ItemText>
            </S.ItemLink>
          </S.ListItem>
          <S.ListItem>
            <S.ItemLink>
              <S.ItemText>
                Polly Wants a Cracker
              </S.ItemText>
            </S.ItemLink>
          </S.ListItem>
          <S.ListItem>
            <S.ItemLink className="is-active">
              <S.ItemText>
                She Was Never a Virgin: A Story Of Diane's Insecurities
              </S.ItemText>
            </S.ItemLink>
          </S.ListItem>
          <S.ListItem>
            <S.ItemLink>
              <S.ItemText>
                New Untitled Project
              </S.ItemText>
            </S.ItemLink>
          </S.ListItem>
        </S.List>
        <S.Flex>
          <S.GroupHeader>
            Generated stories
          </S.GroupHeader>
          <S.AddIcon />
        </S.Flex>
        <S.List>
          <S.ListItem>
            <S.ItemLink>
              <S.ItemText>
                Once Upon a Time in Hollywood
              </S.ItemText>
            </S.ItemLink>
          </S.ListItem>
          <S.ListItem>
            <S.ItemLink>
              <S.ItemText>
                Polly Wants a Cracker
              </S.ItemText>
            </S.ItemLink>
          </S.ListItem>
          <S.ListItem>
            <S.ItemLink>
              <S.ItemText>
                She Was Never a Virgin: A Story Of Diane's Insecurities
              </S.ItemText>
            </S.ItemLink>
          </S.ListItem>
          <S.ListItem>
            <S.ItemLink>
              <S.ItemText>
                New Untitled Project
              </S.ItemText>
            </S.ItemLink>
          </S.ListItem>
        </S.List>
      </S.Container>
    </S.Nav>
  );
}
