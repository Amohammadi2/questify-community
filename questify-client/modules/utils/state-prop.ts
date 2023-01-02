export interface IStateProp <T> {
  set: (data: T) => void;
  value: T;
}