import { describeCommonStoreSpec } from './common-store-spec';
import { reaction } from 'mobx';
import { TagMap } from '@/mappers';
import { TagCollectionStore } from './TagCollectionStore';
import { TagColor } from '@/entities/enums';
import { lorem } from 'faker';
import Tag from '@/entities/Tag';

describe(`Store: TagCollectionStore`, () => {
  describeCommonStoreSpec(TagCollectionStore);

  it(`returns domain model transformed to view model`, (done) => {
    const store = new TagCollectionStore();

    const input: Tag[] = [
      new Tag({ color: TagColor.BLUE, label: lorem.word() }),
      new Tag({ color: TagColor.GREEN, label: lorem.word() }),
      new Tag({ color: TagColor.ORANGE, label: lorem.word() }),
      new Tag({ color: TagColor.PURPLE, label: lorem.word() }),
      new Tag({ color: TagColor.RED, label: lorem.word() })
    ];

    reaction(
      () => store.data && store.data.length,
      (hasData) => {
        if (!hasData) {
          return;
        }
  
        expect(store.data).toEqual(input.map(TagMap.toViewModel));

        done();
      }
    )

    store.set({ data: input });
  });
});
