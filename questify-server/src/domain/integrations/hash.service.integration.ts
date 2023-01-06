export const HASH_SERVICE = Symbol('hash-service');

export abstract class IHashService {
  abstract hash(rawPassword: string): Promise<string>;
  abstract compare(rawPassword: string, hash: string): Promise<boolean>;
}