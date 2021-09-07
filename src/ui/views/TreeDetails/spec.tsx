import '@testing-library/jest-dom';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { TreeDetailsRoute } from './route';
import { container, mocks } from '@/container/mock';
import { createMemoryHistory } from 'history';
import { defaultStoryTreeInfoCollection, defaultStoryTreeRootCollection } from '@/data-sources/localstorage/data';
import { ContainerProvider } from '@/ui/providers';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import { ThemeProvider } from 'styled-components';
import { Themes } from '@/ui/styles/theme';
import * as SYMBOL from '@/container/symbols';

const history = createMemoryHistory();

const Fixture = () => (
  <ContainerProvider container={container}>
    <ThemeProvider theme={Themes.purple}>
      <Router history={history}>
        <Switch>
          <Route
            component={() => <TreeDetailsRoute />}
            exact
            path="/:id"
          />
          <Route
            component={() => <TreeDetailsRoute />}
            exact
            path="/"
          />
        </Switch>
      </Router>
    </ThemeProvider>
  </ContainerProvider>
);

describe(`View: TreeDetails`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`use cases execution`, () => {
    it(`executes story tree root fetching use case on mount`, () => {
      expect(mocks.getTreeUseCaseExecutionMock).not.toBeCalled();

      render(<Fixture />);

      expect(mocks.getTreeUseCaseExecutionMock).toBeCalledWith({
        storyTreeInfoId: defaultStoryTreeInfoCollection[0].id
      });
    });

    it(`executes story tree root fetching use case on mount with proper params`, () => {
      history.push('/story-tree-info-id');

      expect(mocks.getTreeUseCaseExecutionMock).not.toBeCalled();

      render(<Fixture />);

      expect(mocks.getTreeUseCaseExecutionMock).toBeCalledWith({
        storyTreeInfoId: 'story-tree-info-id'
      });
    });

    it(`executes story tree root fetching use case on url change`, async () => {
      history.push('/story-tree-info-id');

      expect(mocks.getTreeUseCaseExecutionMock).not.toBeCalled();

      render(<Fixture />);

      expect(mocks.getTreeUseCaseExecutionMock).toBeCalledWith({
        storyTreeInfoId: 'story-tree-info-id'
      });

      history.push('/other-story-tree-info-id');

      await waitFor(() => {
        expect(mocks.getTreeUseCaseExecutionMock).toBeCalledWith({
          storyTreeInfoId: 'other-story-tree-info-id'
        });
      })
    });
  });

  describe(`rendering`, () => {
    const storyTreeRootDetailsStore
      = container.get<StoryTreeRootDetailsStore>(SYMBOL.store.StoryTreeRootDetailsStore);

    storyTreeRootDetailsStore.set({
      data: defaultStoryTreeRootCollection[0]
    });

    it(`renders story tree root details saved in the store`, () => {
      const { queryByText } = render(<Fixture />);

      expect(queryByText(storyTreeRootDetailsStore.data!.header)).toBeInTheDocument();
    });

    describe(`when stored data changes`, () => {
      it(`renders with updated story tree root details from the store`, () => {
        const { queryByText, rerender } = render(<Fixture />);

        storyTreeRootDetailsStore.set({
          data: defaultStoryTreeRootCollection[1]
        });

        rerender(<Fixture />);

        expect(queryByText(storyTreeRootDetailsStore.data!.header)).toBeInTheDocument();
      });
    });
  });
});
