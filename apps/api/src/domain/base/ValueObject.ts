export class ValueObject<T> {
  protected props: T

  protected constructor(props: T) {
    this.props = props
  }
}
