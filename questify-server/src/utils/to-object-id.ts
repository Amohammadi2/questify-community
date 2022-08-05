import { Types } from "mongoose";

export function toObjectId(id: string | any) {
  return new Types.ObjectId(id);
}