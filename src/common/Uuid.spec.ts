import Uuid from './Uuid';

describe(`Uuid`, () => {
  describe(`create`, () => {
    xit(`creates a unique id by default`, () => {});

    xit(`throws if given string is not a valid uuid`, () => {});

    xit(`creates uuid with given string`, () => {});
  });

  describe(`equality`, () => {
    xtest(`uuids are equal if the have the same uuid string`, () => {});
  });

  describe(`toString`, () => {
    xit(`returns the uuid in string format`, () => {
      const uuid = Uuid.create('63639cf6-c01e-44a7-b618-c8231ab8f140');

      expect(uuid.toString()).toEqual('63639cf6-c01e-44a7-b618-c8231ab8f140');
    });
  });
});
