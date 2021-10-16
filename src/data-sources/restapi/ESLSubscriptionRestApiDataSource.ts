import { Nullable } from '@/common/types';
import {
  CannotSendConfirmationEmail,
  EmailAlreadyTaken,
  InvalidEmailFormat,
  SignToESLErrorUnion
} from '@/use-cases/sign-to-esl/errors';
import { IESLDataSource } from '@/use-cases/sign-to-esl/SignToESLUseCase';

export type ResponseBody = {
  type: string;
};

export class ESLSubscriptionRestApiDataSource implements IESLDataSource {
  async save(email: string): Promise<Nullable<SignToESLErrorUnion>> {
    const response = await fetch('https://skrybeapi.site/esl/subscription', {
      body: email,
      headers: {
        'Content-Type': 'text/plain'
      },
      method: 'POST'
    });

    if (response.status === 201) {
      return Promise.resolve(null);
    }

    const responseBody: ResponseBody = await response.json();

    if (response.status === 422 && responseBody.type === 'invalid_email_format') {
      return Promise.resolve(new InvalidEmailFormat());
    } else if (
      response.status === 422
      && responseBody.type === 'confirmation_email_sending_failure'
    ) {
      return Promise.resolve(new CannotSendConfirmationEmail());
    } else if (response.status === 409) {
      return Promise.resolve(new EmailAlreadyTaken());
    } else {
      return Promise.reject(new Error(responseBody.type));
    }
  }
}
