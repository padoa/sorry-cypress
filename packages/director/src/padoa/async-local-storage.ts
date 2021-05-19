import { Logger } from '@padoa/logger';
import { AsyncLocalStorage } from '@padoa/async-local-storage';

export interface Storage {
  logger?: Logger;
}

export default new AsyncLocalStorage<Storage>();
