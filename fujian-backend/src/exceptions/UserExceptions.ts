export default class UserException extends Error {
  name: string;

  status: number | null;

  message: string;

  messages: unknown | Array<unknown> | null;

  toTranslate: boolean;

  typeError: string;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'UserException';
    this.status = status;
  }
}
