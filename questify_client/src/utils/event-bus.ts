interface BaseEvent {
  eventType: string
  data: any
}

class EventBus {

  queue: Array<BaseEvent> = []

  on (eventType: string, callback: (...args: any[]) => any) {
    document.addEventListener(eventType, (ev) => callback((<CustomEvent>ev).detail))
  }

  pickFromQueue(eventType: string, callback: (...args: any[]) => any) {
    this.queue.filter(e => e.eventType === eventType)
      .forEach(e => callback(e))
    this.queue = this.queue.filter(e => e.eventType !== eventType)
  }

  dispatch (eventType: string, data: any, addToQueue=false) {
    const event = new CustomEvent(eventType, { detail: data })
    document.dispatchEvent(event)
    if (addToQueue && this.queue.filter(e => e.eventType === eventType && e.data === data).length) {
      this.queue.push({ eventType, data })
    }
  }

  remove (eventType: string, callback: (...args: any[]) => any) {
    document.removeEventListener(eventType, callback)
  }
}

export const eventBus = new EventBus()

