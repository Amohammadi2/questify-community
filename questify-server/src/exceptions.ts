interface IExceptionInfo<ErrorCodeType> {
  code: ErrorCodeType;
  message?: string;
}

export default class Exception<ErrorCodeType> extends Error implements IExceptionInfo<ErrorCodeType> {
  public code: ErrorCodeType;

  constructor({
    code, message
  }: IExceptionInfo<ErrorCodeType>) {
    super(message);
    this.code = code;
  }
}

interface IErrorResult <E> {
  code: E;
  message?: string;
}

export class Result <R, E1> {
  public readonly result: R;
  public readonly error: IErrorResult<E1>;

  constructor({ result=null, error=null } : {
    result?: R,
    error?: IErrorResult<E1>
  }) {
    this.result = result;
    this.error = error;
  }

  public unwrap<E2>(errCallback: (err: IErrorResult<E1>) => E2): R | E2 {
    if (this.error) {
      return errCallback(this.error);
    }
    return this.result;
  }
}
