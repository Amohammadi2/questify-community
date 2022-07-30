
export type Optional <T, K extends keyof T> = Omit<T, K> & { [k in K]? : T[k] } 
export type Modify <T, OverrideType> = Omit<T, keyof OverrideType> & OverrideType;
export type Payload <T, OptionalKeys extends keyof T=null, OverrideType={}> = Modify<Optional<T, OptionalKeys>, OverrideType>;