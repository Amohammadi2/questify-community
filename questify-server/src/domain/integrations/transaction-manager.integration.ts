export interface ITransactionUnit {
  run(dbType: string, query: string): Promise<any>;
  commit(): Promise<boolean>;
  rollback(): Promise<boolean>;
}

export interface ITransactionManager {
  beginTransaction <Result> (callback: (tx: ITransactionUnit)=>Promise<Result>): Promise<Result>;
}