import React from 'react';
import { useHistory } from 'react-router-dom';
import { StoryTreeInfoViewModel } from '@/interfaces/view-models';
import { useNavPresenter } from './presenter';
import * as S from './styles';
import { observer } from 'mobx-react-lite';

interface ListProps {
  collection: StoryTreeInfoViewModel[];
}

function List({ collection }: ListProps): React.ReactElement {
  return (
    <>
      {collection.map((item) => (
        <S.ListItem key={item.id}>
          <S.ItemLink to={`/${item.id}`}>
            <S.ItemText>
              {item.title}
            </S.ItemText>
          </S.ItemLink>
        </S.ListItem>
      ))}
    </>
  )
}

export interface NavProps {
  isOpen: boolean;
}

export const Nav = observer(({ isOpen }: NavProps): React.ReactElement => {
  const history = useHistory();

  const {
    collection,
    executeGetStoryTreeInfoCollection
  } = useNavPresenter();

  React.useEffect(() => {
    executeGetStoryTreeInfoCollection();
  }, [executeGetStoryTreeInfoCollection]);
  
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
          {collection.data && <List collection={collection.data} />}
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
});
