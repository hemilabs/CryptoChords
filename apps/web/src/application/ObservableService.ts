import { Observable, EventBusInstance, EventSubscription, Event } from '@cryptochords/shared'
import { Service } from './Service'
import { ServiceResponseEvent } from './events/ServiceResponseEvent'

export abstract class ObservableService<Request, Response>
extends Service<Request, Response>
implements Observable<ServiceResponseEvent<Request,Response>>{
  private eventBus = new EventBusInstance()

  public async execute(request: Request): Promise<Response> {
    const response = this.process(request)
    response.then((responseValue: Response) => {
      const event = new ServiceResponseEvent(request, responseValue)
      this.eventBus.publish(event)
    })
    return response
  }

  public async listen(listener: EventSubscription<ServiceResponseEvent<Request, Response>>) {
    this.eventBus.subscribe(ServiceResponseEvent.eventKey, listener as EventSubscription<Event>)
  }
} 