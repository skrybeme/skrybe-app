import {
  CannotSendConfirmationEmail,
  EmailAlreadyTaken
} from '@/use-cases/sign-to-esl/errors';
import { ISignToESLUseCase } from '@/use-cases/sign-to-esl/SignToESLUseCase';
import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { ErrorResult } from '@/common/types';

export class ESLSubscriptionStore {
  @observable
  private _data = false;

  @observable
  private _error?: ErrorResult<'expected' | 'unexpected'>;

  @observable
  private _isLoading = false;

  constructor(private _signToESLUseCase: ISignToESLUseCase) {
    makeAutoObservable(this);
  }

  @action
  private _initLoading(): void {
    this._data = false;
    this._error = undefined;
    this._isLoading = true;
  }

  @action
  async signToESL(email: string): Promise<void> {
    this._initLoading();

    try {
      const result = await this._signToESLUseCase.execute({ email });

      if (result === null) {
        this._data = true;

        return;
      }

      this._data = false;

      if (result instanceof CannotSendConfirmationEmail) {
        this._error = {
          message: 'This email address seems to be unreachable. Make sure it is correct.',
          type: 'expected'
        };
      } else if (result instanceof EmailAlreadyTaken) {
        this._error = {
          message: 'This email is already taken.',
          type: 'expected'
        };
      } else {
        this._error = {
          message: 'Invalid email format.',
          type: 'expected'
        };
      } 
    } catch (e) {
      runInAction(() => {
        this._error = {
          message: 'Oops, something unexpected went badly wrong... Please, try again later. Sorry about that.',
          type: 'unexpected'
        };
      });
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  @computed
  get data() {
    return this._data;
  }

  @computed
  get errorMessage() {
    return this._error?.message;
  }

  @computed
  get errorType() {
    return this._error?.type;
  }

  @computed
  get isError() {
    return this._error !== undefined;
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }
}
