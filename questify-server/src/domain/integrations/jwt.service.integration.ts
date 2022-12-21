export const JWT_SERVICE = Symbol('jwt-service');

export interface IJwtService {
  encode: (obj: object)=>Promise<string>;
  decode: (token: string)=>Promise<object>;
  verify: (token: string)=>Promise<boolean>;
}