import { generateUuid } from '@/utils';

export interface StorySummaryProps {
  body?: string;
  title?: string;
}

export class StorySummary {
  constructor(private _props?: StorySummaryProps, private _id = generateUuid()) {}

  get body() {
    return this._props?.body;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._props?.title;
  }
}
