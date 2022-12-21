export interface Initializable <InitType> {
  init(data: InitType): Initializable <InitType>;
}