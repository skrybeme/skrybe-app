import { CannotSendConfirmationEmail, EmailAlreadyTaken, InvalidEmailFormat } from '@/use-cases/sign-to-esl/errors';
import { ISignToESLUseCase } from '@/use-cases/sign-to-esl/SignToESLUseCase';
import { internet, lorem } from 'faker';
import { reaction } from 'mobx';
import { ESLSubscriptionStore } from './ESLSubscriptionStore';
import { container, mocks } from '@/container/mock';
import * as SYMBOL from '@/container/symbols';

describe(`ESLSubscriptionStore`, () => {
  const email = internet.email();

  const store = container.get<ESLSubscriptionStore>(SYMBOL.store.ESLSubscriptionStore);

  it(`has initial state`, () => {
    const useCase: ISignToESLUseCase = {
      execute: () => Promise.resolve(null)
    };

    expect(store.data).toBeFalsy();
    expect(store.error).toBeUndefined();
    expect(store.isLoading).toBeFalsy();
  });

  it(`sets loading state on signToESL action call`, (done) => {
    const useCase: ISignToESLUseCase = {
      execute: () => Promise.resolve(null)
    };

    reaction(
      () => store.isLoading,
      (isLoading) => {
        if (!isLoading) {
          return;
        }

        expect(store.data).toBeFalsy();
        expect(store.error).toBeUndefined();
        expect(store.isLoading).toBeTruthy();

        done();
      }
    );

    store.signToESL(email);
  });

  describe(`use case result scenarios`, () => {
    describe(`use case resolves with null`, () => {
      it(`sets proper state`, (done) => {
        mocks.signToESLUseCaseExecutionMock.mockResolvedValueOnce(null);

        store.signToESL(email);

        reaction(
          () => store.isLoading,
          (isLoading) => {
            if (isLoading) {
              return
            }

            expect(store.data).toBeTruthy();
            expect(store.error).toBeUndefined();

            done();
          }
        );
      });
    });

    describe(`use case resolves with CannotSendConfirmationEmail error`, () => {
      it(`sets proper state`, (done) => {
        mocks
          .signToESLUseCaseExecutionMock
          .mockResolvedValueOnce(new CannotSendConfirmationEmail());

        store.signToESL(email);

        reaction(
          () => store.isLoading,
          (isLoading) => {
            if (isLoading) {
              return
            }

            expect(store.data).toBeFalsy();
            expect(store.error).toEqual({
              message: 'This email address seems to be unreachable. Make sure it is correct.',
              type: 'expected'
            });

            done();
          }
        );
      });
    });

    describe(`use case resolves with EmailAlreadyTaken error`, () => {
      it(`sets proper state`, (done) => {
        mocks
          .signToESLUseCaseExecutionMock
          .mockResolvedValueOnce(new EmailAlreadyTaken());

        store.signToESL(email);

        reaction(
          () => store.isLoading,
          (isLoading) => {
            if (isLoading) {
              return
            }

            expect(store.data).toBeFalsy();
            expect(store.error).toEqual({
              message: 'This email is already taken.',
              type: 'expected'
            });

            done();
          }
        );
      });
    });

    describe(`use case resolves with InvalidEmailFormat error`, () => {
      it(`sets proper state`, (done) => {
        mocks
          .signToESLUseCaseExecutionMock
          .mockResolvedValueOnce(new InvalidEmailFormat());

        store.signToESL(email);

        reaction(
          () => store.isLoading,
          (isLoading) => {
            if (isLoading) {
              return
            }

            expect(store.data).toBeFalsy();
            expect(store.error).toEqual({
              message: 'Invalid email format.',
              type: 'expected'
            });

            done();
          }
        );
      });
    });

    describe(`use case resolves with unexpected error`, () => {
      it(`sets proper state`, (done) => {
        mocks
          .signToESLUseCaseExecutionMock
          .mockRejectedValueOnce(new Error(lorem.paragraph()));

        store.signToESL(email);

        reaction(
          () => store.isLoading,
          (isLoading) => {
            if (isLoading) {
              return
            }

            expect(store.data).toBeFalsy();
            expect(store.error).toEqual({
              message: `Oops, something unexpected went badly wrong... Please, try again later. Sorry about that.`,
              type: 'unexpected'
            });

            done();
          }
        );
      });
    });
  });
});
