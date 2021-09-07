import '@testing-library/jest-dom';
import React from 'react';
import { container, mocks } from '@/container/mock';
import * as SYMBOL from '@/container/symbols';
import { CardEditor } from '.';
import { ContainerProvider } from '@/ui/providers';
import { fireEvent, render } from '@testing-library/react';
import { datatype, lorem } from 'faker';
import { CardDetailsStore } from '@/store';
import { TagCollectionStore } from '@/store/TagCollectionStore';
import { TagRepo } from '@/repository';
import StoryCard from '@/entities/StoryCard';
import Tag from '@/entities/Tag';

const cardId = datatype.uuid();
const treeId = datatype.uuid();

const Fixture = () => (
  <ContainerProvider container={container}>
    <CardEditor
      cardId={cardId}
      treeId={treeId}
    />
  </ContainerProvider>
)

describe(`View: CardEditor`, () => {
  const cardDetailsStore
    = container.get<CardDetailsStore>(SYMBOL.store.CardDetailsStore);

  const tagCollectionStore
    = container.get<TagCollectionStore>(SYMBOL.store.TagCollectionStore);

  let data: StoryCard;
  let tagCollection: Tag[];

  beforeEach(async () => {
    tagCollection = await new TagRepo().getCollection();

    tagCollectionStore.set({
      data: tagCollection
    });

    data = new StoryCard({
      body: lorem.paragraph(),
      header: lorem.sentence(),
      tags: tagCollection.slice(0, 4)
    }, cardId);

    cardDetailsStore.set({ data });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`use case execution`, () => {
    it(`executes available tag collection fetching use case on mount`, () => {
      expect(mocks.getTagsByTreeUseCaseExecutionMock).not.toBeCalled();

      render(<Fixture />);

      expect(mocks.getTagsByTreeUseCaseExecutionMock).toBeCalledWith({ treeId });
    });

    it(`executes card details fetching use case on mount`, () => {
      expect(mocks.getCardByIdUseCaseExecutionMock).not.toBeCalled();

      render(<Fixture />);

      expect(mocks.getCardByIdUseCaseExecutionMock).toBeCalledWith({
        id: cardId,
        treeId
      });
    });
  
    it(`executes card details update use case on card header update`, () => {
      expect(mocks.updateCardDetailsUseCaseExecutionMock).not.toBeCalled();

      const { queryByTestId } = render(<Fixture />);

      const editable
        = queryByTestId('main-editable-header')?.querySelector('[contenteditable]');

      const typed = lorem.sentence();

      fireEvent.input(editable!, {
        target: {
          innerHTML: typed
        }
      });

      fireEvent.blur(editable!);

      expect(mocks.updateCardDetailsUseCaseExecutionMock).toBeCalledWith({
        body: data.body,
        header: typed,
        id: data.id,
        tags: data.tags.map(({ id }) => id),
        treeId
      });
    });

    it(`executes card details update use case on clipped card header update`, () => {
      expect(mocks.updateCardDetailsUseCaseExecutionMock).not.toBeCalled();

      const { queryByTestId } = render(<Fixture />);

      const editable
        = queryByTestId('clipped-editable-header')?.querySelector('[contenteditable]');

      const typed = lorem.sentence();

      fireEvent.input(editable!, {
        target: {
          innerHTML: typed
        }
      });

      fireEvent.blur(editable!);

      expect(mocks.updateCardDetailsUseCaseExecutionMock).toBeCalledWith({
        body: data.body,
        header: typed,
        id: data.id,
        tags: data.tags.map(({ id }) => id),
        treeId
      });
    });
  
    it(`executes card details update use case on card body update`, () => {
      expect(mocks.updateCardDetailsUseCaseExecutionMock).not.toBeCalled();

      const { queryByTestId } = render(<Fixture />);

      const editable
        = queryByTestId('editable-body')?.querySelector('[contenteditable]');

      const typed = lorem.sentence();

      fireEvent.input(editable!, {
        target: {
          innerHTML: typed
        }
      });

      fireEvent.blur(editable!);

      expect(mocks.updateCardDetailsUseCaseExecutionMock).toBeCalledWith({
        body: typed,
        header: data.header,
        id: data.id,
        tags: data.tags.map(({ id }) => id),
        treeId
      });
    });

    it(`does not execute card details update use case when tag picker opens`, () => {
      expect(mocks.updateCardDetailsUseCaseExecutionMock).not.toBeCalled();

      const { queryByTestId } = render(<Fixture />);

      const trigger = queryByTestId('clickable-trigger');

      fireEvent.click(trigger!);

      expect(mocks.updateCardDetailsUseCaseExecutionMock).not.toBeCalled();
    });
  
    it(`executes card details update use case on card tags update`, () => {
      expect(mocks.updateCardDetailsUseCaseExecutionMock).not.toBeCalled();

      const { queryAllByTestId, queryByTestId } = render(<Fixture />);

      const trigger = queryByTestId('clickable-trigger');
      const tags = queryAllByTestId('tag-color');

      fireEvent.click(trigger!);
      
      tags.forEach((tag) => {
        fireEvent.click(tag);
      });

      fireEvent.click(trigger!);

      expect(mocks.updateCardDetailsUseCaseExecutionMock).toBeCalledWith({
        body: data.body,
        header: data.header,
        id: data.id,
        tags: tagCollection.slice(4, 7).map(({ id }) => id),
        treeId
      });
    });
  })

  describe(`rendering`, () => {
    it(`renders card details saved in the store`, () => {
      const { queryAllByTestId, queryAllByText, queryByText } = render(<Fixture />);

      const bodyElement = queryByText(data.body);
      const headerElements = queryAllByText(data.header);
      const tagElements = queryAllByTestId('tag');

      expect(bodyElement).toBeInTheDocument();
      expect(headerElements[0]).toBeInTheDocument();
      expect(headerElements[1]).toBeInTheDocument();
      expect(tagElements.length).toEqual(data.tags.length);
    });

    describe(`when stored data changes`, () => {
      it(`renders with updated card details from the store`, () => {
        const {
          queryAllByTestId,
          queryAllByText,
          queryByText,
          rerender
        } = render(<Fixture />);

        data = new StoryCard({
          body: lorem.paragraph(),
          header: lorem.sentence(),
          tags: tagCollection.sort(() => 0.5 - Math.random()).slice(0, 3)
        });
  
        cardDetailsStore.set({ data });

        rerender(<Fixture />);

        const bodyElement = queryByText(data.body);
        const headerElements = queryAllByText(data.header);
        const tagElements = queryAllByTestId('tag');

        expect(bodyElement).toBeInTheDocument();
        expect(headerElements[0]).toBeInTheDocument();
        expect(headerElements[1]).toBeInTheDocument();
        expect(tagElements.length).toEqual(data.tags.length);
      });
    });
  })
});
