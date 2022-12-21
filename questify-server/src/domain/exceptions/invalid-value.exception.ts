export class InvalidValueErr extends Error {
  constructor(msg: string) {
    super(`invalid-object: ${msg}`);
  }
}