export class SetAccountActiveStatusCommand {
  constructor(
    public readonly userId: string,
    public readonly isActive: boolean
  ) {}
}