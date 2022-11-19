import { Types } from 'mongoose';

export function toObjectId(input: string) {
  return new Types.ObjectId(input);
}