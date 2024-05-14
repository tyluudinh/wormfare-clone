/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  OBSERVABLE_INSTANCES_SYMBOL,
  ObservableInstances,
} from '@common/state';

type AnyFn = (...args: any[]) => any;

type ClassProperties<C> = {
  [K in keyof C as C[K] extends AnyFn ? never : K]: C[K];
};

export const useServiceState = <T>(
  service: T,
  initPropertiesToSubscribe?: Array<keyof ClassProperties<T>>,
): ClassProperties<T> => {
  const observables = (service as unknown as ObservableInstances)[
    OBSERVABLE_INSTANCES_SYMBOL
  ];

  const allKeys = Array.from(observables?.keys() || []) as Array<
    keyof ClassProperties<T>
  >;

  const propertiesToSubscribe = initPropertiesToSubscribe || allKeys;

  const [state, setState] = useState<ClassProperties<T>>(() => {
    const initialState = {} as any;

    propertiesToSubscribe.forEach((key) => {
      initialState[key] = service[key];
    });

    return initialState as ClassProperties<T>;
  });

  useEffect(() => {
    const subscriptions = new Map<string, () => void>();

    propertiesToSubscribe.forEach((key) => {
      const observable = observables.get(key as string);

      if (observable) {
        subscriptions.set(
          key as string,
          observable.subscribe((value) => {
            setState((prevState) => ({
              ...prevState,
              [key]: value,
            }));
          }),
        );
      }
    });

    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
    };
  }, [observables, propertiesToSubscribe]);

  return state;
};
