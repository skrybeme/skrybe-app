export class CannotSendConfirmationEmail extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, CannotSendConfirmationEmail.prototype);
  }
}

export class EmailAlreadyTaken extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, EmailAlreadyTaken.prototype);
  }
}

export class InvalidEmailFormat extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, InvalidEmailFormat.prototype);
  }
}

export type SignToESLErrorUnion
  = CannotSendConfirmationEmail | EmailAlreadyTaken | InvalidEmailFormat;
