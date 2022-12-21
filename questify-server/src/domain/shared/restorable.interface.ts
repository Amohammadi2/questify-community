export interface Restorable <RestoreType> {
  restore(data: RestoreType): Restorable <RestoreType>;
}