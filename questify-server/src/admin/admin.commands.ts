export class SetAccountActiveStatusCommand {
  constructor(
    public readonly userId: string,
    public readonly isActive: boolean
  ) {}
}

export class SetSchoolActiveStatusCommand {
  constructor(
    public readonly schoolId: string,
    public readonly isActive: boolean
  ) {}
}