import { SchoolPayload } from "./school-management.schemas";

export class CreateSchoolCommand {
  constructor(
    public readonly school: SchoolPayload
  ) {}
}
