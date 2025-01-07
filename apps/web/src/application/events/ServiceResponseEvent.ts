import { Event } from '@cryptochords/shared';

export class ServiceResponseEvent<Request, Response> extends Event {
  static eventKey = Symbol('ServiceResponseEvent');
  constructor(
    public readonly request: Request,
    public readonly response: Response,
  ) {
    super(ServiceResponseEvent.eventKey);
  }
}
