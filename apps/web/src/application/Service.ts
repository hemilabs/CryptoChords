export abstract class Service<Request, Response>{
  protected abstract process(request: Request): Promise<Response>
  
  public async execute(request: Request): Promise<Response> {
    return this.process(request)
  }
} 