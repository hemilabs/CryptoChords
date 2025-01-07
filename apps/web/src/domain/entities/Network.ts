import { Entity } from '../../../../../packages/shared/src/domain/base/Entity';
import { NetworkEnum } from '../../../../../packages/shared/src/domain/enums/NetworkEnum';
import { Uuid } from '../../../../../packages/shared/src/domain/valueObjects/Uuid';

export interface NetworkProps {
  name: NetworkEnum;
  explorerUrl: string;
  wsUrl: string;
}

export class Network extends Entity<NetworkProps> {
  private constructor(props: NetworkProps, uuid: Uuid) {
    super(props, uuid);
  }

  static create(props: NetworkProps, id?: Uuid) {
    const uuid = id ?? Uuid.create();
    return new Network(props, uuid);
  }

  get name() {
    return this.props.name;
  }

  get explorerUrl() {
    return this.props.explorerUrl;
  }

  get transactionUrl() {
    return `${this.explorerUrl}/tx`;
  }

  get blockUrl() {
    return `${this.explorerUrl}/block`;
  }

  get wsUrl() {
    return this.props.wsUrl;
  }
}
