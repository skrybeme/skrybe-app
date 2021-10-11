import { Nullable } from '@/common/types';
import { IExecutable } from '@/interfaces';
import { SignToESLErrorUnion } from './errors';

export interface IESLDataSource {
  save: (email: string) => Promise<Nullable<SignToESLErrorUnion>>;
}

export interface SignToESLRequest {
  email: string;
}

export class SignToESLUseCase implements IExecutable<
  SignToESLRequest,
  Promise<Nullable<SignToESLErrorUnion>>
> {
  constructor(private _eslRepo: IESLDataSource) {}

  async execute(
    request: SignToESLRequest
  ): Promise<Nullable<SignToESLErrorUnion>> {
    return this._eslRepo.save(request.email);
  }
}
