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