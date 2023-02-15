import { useEffect } from "react";

export class EventEmitter {
  private events: { [_: string]: Array<(payload:any)=>void> } = {};

  subscribe <PayloadT> (eventName: string,handler: (payload:PayloadT)=>void): ()=>void {
    if (!this.events[eventName])
      this.events[eventName] = [];
    this.events[eventName].push(handler);
    return () => {
      this.events[eventName] = this.events[eventName].filter(h => h!=handler);
    };
  }

  publish <PayloadT>  (eventName: string, payload: PayloadT) {
    if (!this.events[eventName])
      return; // if there are no subscribers, do nothing
    this.events[eventName].forEach(handler => {
      handler(payload);
    })
  }
}

export const useEvent = <T=any> (emitter: EventEmitter, eventName: string, handler: (payload: T)=>void) => {
  useEffect(() => {
    return emitter.subscribe<T>(eventName, handler);
  }, [emitter, eventName, handler])
}