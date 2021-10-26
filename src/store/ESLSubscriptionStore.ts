import {
  CannotSendConfirmationEmail,
  EmailAlreadyTaken
} from '@/use-cases/sign-to-esl/errors';
import { ISignToESLUseCase } from '@/use-cases/sign-to-esl/SignToESLUseCase';
import { action, autorun, computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { ErrorResult } from '@/common/types';
import { inject, injectable } from 'inversify';
import * as SYMBOL from '@/container/symbols';

@injectable()
export class ESLSubscriptionStore {
  @observable
  data = false;

  @observable
  error?: ErrorResult<'expected' | 'unexpected'> = undefined;

  @observable
  isLoading = false;

  @inject(SYMBOL.useCase.SignToESLUseCase)
  private _signToESLUseCase!: ISignToESLUseCase;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  private _initLoading(): void {
    this.data = false;
    this.error = undefined;
    this.isLoading = true;
  }

  @action
  async signToESL(email: string): Promise<void> {
    this._initLoading();

    try {
      const result = await this._signToESLUseCase.execute({ email });

      if (result === null) {
        this.data = true;
        this.error = undefined;
        this.isLoading = false;

        return;
      }

      this.data = false;

      if (result instanceof CannotSendConfirmationEmail) {
        this.error = {
          message: 'This email address seems to be unreachable. Make sure it is correct.',
          type: 'expected'
        };
      } else if (result instanceof EmailAlreadyTaken) {
        this.error = {
          message: 'This email is already taken.',
          type: 'expected'
        };
      } else {
        this.error = {
          message: 'Invalid email format.',
          type: 'expected'
        };
      } 
    } catch (e) {
      runInAction(() => {
        this.error = {
          message: 'Oops, something unexpected went badly wrong... Please, try again later. Sorry about that.',
          type: 'unexpected'
        };
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
