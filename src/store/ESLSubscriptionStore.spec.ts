import { CannotSendConfirmationEmail, EmailAlreadyTaken, InvalidEmailFormat } from '@/use-cases/sign-to-esl/errors';
import { ISignToESLUseCase } from '@/use-cases/sign-to-esl/SignToESLUseCase';
import { internet, lorem } from 'faker';
import { reaction } from 'mobx';
import { ESLSubscriptionStore } from './ESLSubscriptionStore';

describe(`ESLSubscriptionStore`, () => {
  const email = internet.email();

  it(`has initial state`, () => {
    const useCase: ISignToESLUseCase = {
      execute: () => Promise.resolve(null)
    };

    const store = new ESLSubscriptionStore(useCase);

    expect(store.data).toBeFalsy();
    expect(store.isError).toBeFalsy();
    expect(store.isLoading).toBeFalsy();
    expect(store.errorMessage).toBeUndefined();
    expect(store.errorType).toBeUndefined();
  });

  it(`sets loading state on signToESL action call`, (done) => {
    const useCase: ISignToESLUseCase = {
      execute: () => Promise.resolve(null)
    };

    const store = new ESLSubscriptionStore(useCase);

    reaction(
      () => store.isLoading,
      (isLoading) => {
        if (!isLoading) {
          return;
        }

        expect(store.data).toBeFalsy();
        expect(store.isError).toBeFalsy();
        expect(store.errorMessage).toBeUndefined();
        expect(store.errorType).toBeUndefined();

        expect(store.isLoading).toBeTruthy();

        done();
      }
    );

    store.signToESL(email);
  });

  describe(`use case result scenarios`, () => {
    describe(`use case resolves with null`, () => {
      const useCase: ISignToESLUseCase = {
        execute: () => Promise.resolve(null)
      };
  
      const store = new ESLSubscriptionStore(useCase);

      it(`sets proper state`, (done) => {
        store.signToESL(email);

        reaction(
          () => store.isLoading,
          (isLoading) => {
            if (isLoading) {
              return
            }

            expect(store.data).toBeTruthy();
            expect(store.isError).toBeFalsy();
            expect(store.errorMessage).toBeUndefined();
            expect(store.errorType).toBeUndefined();

            done();
          }
        );
      });
    });

    describe(`use case resolves with CannotSendConfirmationEmail error`, () => {
      const useCase: ISignToESLUseCase = {
        execute: () => Promise.resolve(new CannotSendConfirmationEmail())
      };
  
      const store = new ESLSubscriptionStore(useCase);

      it(`sets proper state`, (done) => {
        store.signToESL(email);

        reaction(
          () => store.isLoading,
          (isLoading) => {
            if (isLoading) {
              return
            }

            expect(store.data).toBeFalsy();
            expect(store.isError).toBeTruthy();
            expect(store.errorMessage).toEqual('This email address seems to be unreachable. Make sure it is correct.');
            expect(store.errorType).toEqual('expected');

            done();
          }
        );
      });
    });

    describe(`use case resolves with EmailAlreadyTaken error`, () => {
      const useCase: ISignToESLUseCase = {
        execute: () => Promise.resolve(new EmailAlreadyTaken())
      };
  
      const store = new ESLSubscriptionStore(useCase);

      it(`sets proper state`, (done) => {
        store.signToESL(email);

        reaction(
          () => store.isLoading,
          (isLoading) => {
            if (isLoading) {
              return
            }

            expect(store.data).toBeFalsy();
            expect(store.isError).toBeTruthy();
            expect(store.errorMessage).toEqual('This email is already taken.');
            expect(store.errorType).toEqual('expected');

            done();
          }
        );
      });
    });

    describe(`use case resolves with InvalidEmailFormat error`, () => {
      const useCase: ISignToESLUseCase = {
        execute: () => Promise.resolve(new InvalidEmailFormat())
      };
  
      const store = new ESLSubscriptionStore(useCase);

      it(`sets proper state`, (done) => {
        store.signToESL(email);

        reaction(
          () => store.isLoading,
          (isLoading) => {
            if (isLoading) {
              return
            }

            expect(store.data).toBeFalsy();
            expect(store.isError).toBeTruthy();
            expect(store.errorMessage).toEqual('Invalid email format.');
            expect(store.errorType).toEqual('expected');

            done();
          }
        );
      });
    });

    describe(`use case resolves with unexpected error`, () => {
      const useCase: ISignToESLUseCase = {
        execute: () => Promise.reject(new Error(lorem.paragraph()))
      };
  
      const store = new ESLSubscriptionStore(useCase);

      it(`sets proper state`, (done) => {
        store.signToESL(email);

        reaction(
          () => store.isLoading,
          (isLoading) => {
            if (isLoading) {
              return
            }

            expect(store.data).toBeFalsy();
            expect(store.isError).toBeTruthy();
            expect(store.errorMessage).toEqual(`Oops, something unexpected went badly wrong... Please, try again later. Sorry about that.`);
            expect(store.errorType).toEqual('unexpected');

            done();
          }
        );
      });
    });
  });
});
