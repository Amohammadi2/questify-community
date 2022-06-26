export function getProps(result: any, index:number, name: string): any {
  return result.records[index].get(name).properties;
}