import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { lorem } from 'faker';
import React from 'react';
import {
  EditableParagraphProps,
  EditableParagraph_VariantA as EditableParagraph
} from './';

const Fixture = (() => {
  const initialProps: EditableParagraphProps = {
    initialValue: lorem.paragraph(),
    onSave: jest.fn(),
    title: lorem.sentence()
  };

  return {
    component: (
      <EditableParagraph {...initialProps} />
    ),
    initialProps,
    updatedValue: lorem.paragraph()
  };
})();

describe("Domain component: EditableParagraph", () => {
  it("renders with initial value", () => {
    const result = render(Fixture.component);

    expect(result.queryByText(Fixture.initialProps.initialValue)).toBeInTheDocument();
  });

  it("renders in edit state on focus", () => {
    const result = render(Fixture.component);

    const editable = result.queryByTestId('editable');

    expect(result.queryByText('You are editting card:')).not.toBeInTheDocument();
    expect(result.queryByText(Fixture.initialProps.title)).not.toBeInTheDocument();

    fireEvent.focus(editable!);

    expect(result.queryByText('You are editting card:')).toBeInTheDocument();
    expect(result.queryByText(Fixture.initialProps.title)).toBeInTheDocument();
  });

  it("quits edit state on blur", () => {
    const result = render(Fixture.component);

    const editable = result.queryByTestId('editable');

    fireEvent.focus(editable!);
    fireEvent.blur(editable!);

    expect(result.queryByText('You are editting card:')).not.toBeInTheDocument();
    expect(result.queryByText(Fixture.initialProps.title)).not.toBeInTheDocument();
  });

  describe("edit state", () => {
    it("renders with save button", () => {
      const result = render(Fixture.component);

      const editable = result.queryByTestId('editable');

      expect(result.queryByText("Save")).not.toBeInTheDocument();

      fireEvent.focus(editable!);

      expect(result.queryByText("Save")).toBeInTheDocument();
    });

    describe("when leaving edit state on blur", () => {
      it.only("display initial value despite changes made to editable", async () => {
        const result = render(Fixture.component);

        const editable = result.queryByTestId('editable');

        fireEvent.focus(editable!);

        fireEvent.change(editable!, {
          target: {
            innerHTML: Fixture.updatedValue
          }
        });

        expect(result.queryByText(Fixture.initialProps.initialValue)).not.toBeInTheDocument();
        expect(result.queryByText(Fixture.updatedValue)).toBeInTheDocument();

        fireEvent.blur(editable!);

        await waitFor(() => {
          expect(result.queryByText(Fixture.initialProps.initialValue)).toBeInTheDocument();
          expect(result.queryByText(Fixture.updatedValue)).not.toBeInTheDocument();
        });
      });

      describe("when entering edit state again", () => {
        it.todo("restores changes made previously");
      });
    });

    describe("when save button is clicked", () => {
      it("calls a handler", () => {
        const result = render(Fixture.component);

        const editable = result.queryByTestId('editable');

        fireEvent.focus(editable!);

        const saveButton = result.queryByText("Save");

        fireEvent.change(editable!, {
          target: {
            innerHTML: Fixture.updatedValue
          }
        });

        fireEvent.click(saveButton!);

        expect(Fixture.initialProps.onSave).toBeCalledWith(Fixture.updatedValue);
      });

      it.todo("allows to exit edit state with a function passed as a handler argument");
    });
  });

  it.todo("value update");
});
