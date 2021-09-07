import { useStoryTreeInfoCollectionPresenter } from '@/ui/presenters';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as S from './styles';

export interface NavProps {
  isOpen: boolean;
}

export function Nav({ isOpen }: NavProps): React.ReactElement {
  const {
    collection,
    executeGetStoryTreeInfoCollection
  } = useStoryTreeInfoCollectionPresenter();

  React.useEffect(() => {
    executeGetStoryTreeInfoCollection();
  }, [executeGetStoryTreeInfoCollection]);
  
  const history = useHistory();

  React.useLayoutEffect(() => {
    if (history.location.pathname === "/" && collection.data) {
      history.push(collection.data[0].id);
    }
  }, []);

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
          {collection.data && collection.data.map((item) => (
            <S.ListItem key={item.id}>
              <S.ItemLink to={`/${item.id}`}>
                <S.ItemText>
                  {item.title}
                </S.ItemText>
              </S.ItemLink>
            </S.ListItem>
          ))}
        </S.List>
        <S.Flex>
          <S.GroupHeader>
            Generated stories
          </S.GroupHeader>
          <S.AddIcon />
        </S.Flex>
        <S.List>
          <S.ListItem>
            <S.ItemLink to="/asdasdasdas">
              <S.ItemText>
                Once Upon a Time in Hollywood
              </S.ItemText>
            </S.ItemLink>
          </S.ListItem>
          <S.ListItem>
            <S.ItemLink to="/2d12d12d12">
              <S.ItemText>
                Polly Wants a Cracker
              </S.ItemText>
            </S.ItemLink>
          </S.ListItem>
          <S.ListItem>
            <S.ItemLink to="/asdasdsaadasd">
              <S.ItemText>
                She Was Never a Virgin: A Story Of Diane's Insecurities
              </S.ItemText>
            </S.ItemLink>
          </S.ListItem>
          <S.ListItem>
            <S.ItemLink to="/asdcascasdcadscd">
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
