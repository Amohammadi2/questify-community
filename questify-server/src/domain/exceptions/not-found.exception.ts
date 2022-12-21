export class NotFoundErr extends Error {
  constructor(msg: string) {
    super(`not-found: ${msg}`);
  }
}
