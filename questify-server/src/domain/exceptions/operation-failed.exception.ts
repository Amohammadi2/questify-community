export class OpertationFailedErr extends Error {
  constructor(msg: string) {
    super(`operation-failed: ${msg}`)
  }
}