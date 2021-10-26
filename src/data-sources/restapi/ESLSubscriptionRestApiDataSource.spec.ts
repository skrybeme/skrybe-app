import fetch from 'jest-fetch-mock';
import { internet } from 'faker';
import { ESLSubscriptionRestApiDataSource } from './ESLSubscriptionRestApiDataSource';
import {
  CannotSendConfirmationEmail,
  EmailAlreadyTaken,
  InvalidEmailFormat
} from '@/use-cases/sign-to-esl/errors';

describe(`ESLSubscriptionRestApiDataSource`, () => {
  const dataSource = new ESLSubscriptionRestApiDataSource();
  const email = internet.email();

  describe(`when endpoint responds with 201`, () => {
    fetch.mockResponseOnce('', { status: 201 });

    it(`resolves with null`, async () => {
      await expect(dataSource.save(email)).resolves.toBeNull();
    });
  });

  describe(`when endpoint responds with 409`, () => {
    fetch.mockResponseOnce(
      JSON.stringify({ type: 'email_already_taken' }),
      { status: 409 }
    );

    it(`resolves with EmailAlreadyTaken error`, async () => {
      const result = await dataSource.save(email);
      
      expect(result instanceof EmailAlreadyTaken).toBeTruthy();
    });
  });

  describe(`when endpoint responds with 422 and type "invalid_email_format"`, () => {
    fetch.mockResponseOnce(
      JSON.stringify({ type: 'invalid_email_format' }),
      { status: 422 }
    );

    it(`resolves with InvalidEmailFormat error`, async () => {
      const result = await dataSource.save(email);

      expect(result instanceof InvalidEmailFormat).toBeTruthy();
    });
  });

  describe(
    `when endpoint responds with 422 and type "confirmation_email_sending_failure"`,
    () => {
      fetch.mockResponseOnce(
        JSON.stringify({ type: 'confirmation_email_sending_failure' }),
        { status: 422 }
      );

      it(`resolves with CannotSendConfirmationEmail error`, async () => {
        const result = await dataSource.save(email);

        expect(result instanceof CannotSendConfirmationEmail).toBeTruthy();
      });
    }
  );

  describe(`when endpoint responds with 500`, () => {
    fetch.mockResponseOnce(
      JSON.stringify({ type: 'internal_server_error' }),
      { status: 500 }
    );

    it(`rejects with custom error`, async () => {
      try {
        await dataSource.save(email);
      } catch (e) {
        expect(e instanceof Error).toBeTruthy();
        expect((e as any).message).toEqual('internal_server_error');
      }
    });
  });
});
