export interface ITransactionUnit {
  run(dbType: string, query: string, params: any): Promise<any>;
  commit(): Promise<boolean>;
  rollback(): Promise<boolean>;
  isActive(): boolean;
}

export interface ITransactionManager {
  beginTransaction <Result> (callback: (tx: ITransactionUnit)=>Promise<Result>): Promise<Result>;
}