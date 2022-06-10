export default class Exception<ErrorCodeType> extends Error {
  constructor(
    public readonly code: ErrorCodeType,
    public readonly message: string,
  ) {
    super(message);
  }
}