const errorCodePattern = /^(\S*):(.*)$/;

export function raiseError(code: string, message: string = '') {
  throw new Error(`${code}:${message}`)
}

export function getErrorDetails(err: any) {
  if (err.message.match(errorCodePattern)) {
    const [code, msg] = err.message.split(':');
    return {code, message: msg};
  }
  throw(err);
}
