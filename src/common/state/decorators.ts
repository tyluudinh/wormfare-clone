/* eslint-disable @typescript-eslint/no-explicit-any */

import { Observable } from '@common/observable';

// Define symbols for accessing internals
export const OBSERVABLES_METADATA_SYMBOL = Symbol('observablesMetadata');
export const OBSERVABLE_INSTANCES_SYMBOL = Symbol('observableInstances');

export interface ObservableInstances {
  [OBSERVABLE_INSTANCES_SYMBOL]: Map<string, Observable<any>>;
}

// Update the observable decorator to use the symbol
export function observable(target: any, propertyKey: string) {
  if (!target[OBSERVABLES_METADATA_SYMBOL]) {
    target[OBSERVABLES_METADATA_SYMBOL] = [];
  }

  target[OBSERVABLES_METADATA_SYMBOL].push(propertyKey);
}

// Update WithObservables to maintain the link to the original class
export function MakeObservable<T extends { new (...args: any[]): any }>(
  constructor: T,
) {
  const extendedClass = class extends constructor {
    [OBSERVABLE_INSTANCES_SYMBOL]: Map<string, Observable<any>>;

    constructor(...args: any[]) {
      super(...args);

      const observables = new Map<string, Observable<any>>();

      this[OBSERVABLE_INSTANCES_SYMBOL] = observables;

      const observableProperties: string[] =
        constructor.prototype[OBSERVABLES_METADATA_SYMBOL];

      if (!observableProperties) return;

      for (const propertyKey of observableProperties) {
        const observable = new Observable((this as any)[propertyKey]);

        observables.set(propertyKey, observable);

        Object.defineProperty(this, propertyKey, {
          get() {
            return observables.get(propertyKey)?.get();
          },
          set(newValue) {
            observables.get(propertyKey)?.set(newValue);
          },
          enumerable: true,
          configurable: true,
        });
      }
    }
  };

  // Re-apply constructor parameter metadata to the extended class
  const params = Reflect.getMetadata('design:paramtypes', constructor);

  if (params) {
    Reflect.defineMetadata('design:paramtypes', params, extendedClass);
  }

  return extendedClass;
}
