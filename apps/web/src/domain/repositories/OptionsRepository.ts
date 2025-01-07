import { Options } from '../valueObjects/Options';

export interface OptionsRepository {
  setOptions: (options: Options) => Promise<void>;
  getOptions: () => Promise<Options>;
}
