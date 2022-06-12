import crypto from "crypto";

export function getPasswordHash(password: string) {
  if (password === null) return null;
  return crypto.createHash('sha256').update(password).digest('hex');
}