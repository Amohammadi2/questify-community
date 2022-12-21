export class ValidationErr extends Error {
  private errorsList: Array<string>;

  constructor(errors: Array<string>) {
    super(`validation-error: ${errors.join(',')}`);
    this.errorsList = errors;
  }

  getErrorsList() {
    return this.errorsList;
  }
}