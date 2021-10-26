import { internet } from 'faker';
import {
  CannotSendConfirmationEmail,
  EmailAlreadyTaken,
  InvalidEmailFormat
} from './errors';
import {
  IESLDataSource,
  SignToESLUseCase
} from './SignToESLUseCase';

describe(`SignToESLUseCase`, () => {
  const email = internet.email();

  it(`calls data source's persisting method`, () => {
    const dataSource: IESLDataSource = {
      save: jest.fn()
    };

    const signToESLUseCase = new SignToESLUseCase(dataSource);

    signToESLUseCase.execute({ email });

    expect(dataSource.save).toBeCalledWith(email);
  });

  describe(`happy path`, () => {
    it(`resolves with null`, async () => {
      const dataSource: IESLDataSource = {
        save: () => Promise.resolve(null)
      };
  
      const signToESLUseCase = new SignToESLUseCase(dataSource);
  
      await expect(signToESLUseCase.execute({ email })).resolves.toBeNull();
    });
  });

  describe(`error paths`, () => {
    describe(`invalid email format`, () => {
      it(`resolves with InvalidEmailFormat error`, async () => {
        const dataSource: IESLDataSource = {
          save: () => Promise.resolve(new InvalidEmailFormat())
        };
    
        const signToESLUseCase = new SignToESLUseCase(dataSource);

        const result = await signToESLUseCase.execute({ email });

        expect(result instanceof InvalidEmailFormat).toBeTruthy();
      });
    });

    describe(`couldn't send confirmation email`, () => {
      it(`resolves with CannotSendConfirmationEmail error`, async () => {
        const dataSource: IESLDataSource = {
          save: () => Promise.resolve(new CannotSendConfirmationEmail())
        };
    
        const signToESLUseCase = new SignToESLUseCase(dataSource);

        const result = await signToESLUseCase.execute({ email });

        expect(result instanceof CannotSendConfirmationEmail).toBeTruthy();
      });
    });

    describe(`email already exists`, () => {
      it(`resolves with EmailAlreadyTaken error`, async () => {
        const dataSource: IESLDataSource = {
          save: () => Promise.resolve(new EmailAlreadyTaken())
        };
    
        const signToESLUseCase = new SignToESLUseCase(dataSource);

        const result = await signToESLUseCase.execute({ email });

        expect(result instanceof EmailAlreadyTaken).toBeTruthy();
      });
    });
  });

  describe(`unexpected error`, () => {
    it(`rejects with error`, async () => {
      const dataSource: IESLDataSource = {
        save: () => Promise.reject(new Error('unexpected error message'))
      };
  
      const signToESLUseCase = new SignToESLUseCase(dataSource);

      try {
        await signToESLUseCase.execute({ email });
      } catch (e) {
        expect(e instanceof Error).toBeTruthy();
        expect(e.message).toEqual('unexpected error message');
      }
    });
  });
});
