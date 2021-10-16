import {
  CannotSendConfirmationEmail,
  EmailAlreadyTaken,
  InvalidEmailFormat
} from '@/use-cases/sign-to-esl/errors';
import { ISignToESLUseCase } from '@/use-cases/sign-to-esl/SignToESLUseCase';
import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';

export class ESLSubscriptionStore {
  @observable
  private _data = false;

  @observable
  private _errorMessage?: string;

  @observable
  private _errorType?: 'expected' | 'unexpected';

  @observable
  private _isError = false;

  @observable
  private _isLoading = false;

  constructor(private _signToESLUseCase: ISignToESLUseCase) {
    makeAutoObservable(this);
  }

  @action
  private _initLoading(): void {
    this._data = false;
    this._errorMessage = undefined;
    this._errorType = undefined;
    this._isError = false;
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
      this._isError = true;

      if (result instanceof CannotSendConfirmationEmail) {
        this._errorMessage = 'This email address seems to be unreachable. Make sure it is correct.';
        this._errorType = 'expected';
      } else if (result instanceof EmailAlreadyTaken) {
        this._errorMessage = 'This email is already taken.';
        this._errorType = 'expected';
      } else if (result instanceof InvalidEmailFormat) {
        this._errorMessage = 'Invalid email format.';
        this._errorType = 'expected';
      } 
    } catch (e) {
      runInAction(() => {
        this._errorMessage = `Oops, something unexpected went badly wrong... Please, try again later. Sorry about that.`;
        this._errorType = 'unexpected';
        this._isError = true;
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
    return this._errorMessage;
  }

  @computed
  get errorType() {
    return this._errorType;
  }

  @computed
  get isError() {
    return this._isError;
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }
}
