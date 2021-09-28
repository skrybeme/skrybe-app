import React from 'react';
import { render } from '@testing-library/react';
import { SummaryGenerator } from '.';

const Fixture = (() => {
  return {
    component: (
      <SummaryGenerator />
    )
  };
})();

describe(`View: SummaryGenerator`, () => {
  describe(`tags`, () => {
    it.todo(`renders with tags used in the story tree`, () => {
      const result = render(Fixture.component);
    });

    it.todo(`renders with "empty" tag`);

    it.todo(`renders tags as selected basing on store state`);

    it.todo(`updates store state on tag click`);
  });

  describe(`order`, () => {
    it.todo(`renders with two options: DFS and BFS`);

    it.todo(`renders options as selected basing on store state`);

    it.todo(`updates store state on option click`);
  });

  describe(`leaves`, () => {
    it.todo(`renders with checkbox with proper label`);

    it.todo(`renders checkbox as checked/unchecked basing on store state`);

    it.todo(`updates store state on checkbox click`);
  });

  describe(`cards`, () => {
    it.todo(`renders story tree nodes as checked/unchecked basing on store state`);

    it.todo(`updates store state on story tree node click`);
  });

  describe(`saving`, () => {
    describe(`when "Save as story summary draft" button is clicked`, () => {
      it.todo(`calls proper use case`);
    });

    describe(`when "Save as story summary" button is clicked`, () => {
      it.todo(`calls proper use case`);
    });
  });
});
