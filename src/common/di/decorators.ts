import { DIContainer } from './DIContainer';

export function Injectable() {
  return function <T extends { new (...args: any[]): any }>(constructor: T) {
    DIContainer.register(constructor);
  };
}
