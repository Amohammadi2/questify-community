export const HASH_SERVICE = Symbol('hash-service');

export interface IHashService {
  hash: (rawPassword: string)=>Promise<string>;
  compare: (rawPassword: string, hash: string)=>Promise<boolean>;
}